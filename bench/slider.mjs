/**
 * Compare Playwright engines on the same slider script.
 * Classic mode is headless Chrome launched by Playwright.
 * Obscura is obscura.sh, driven over CDP with the same Playwright API.
 *
 * CSS transitions are turned off and the script only waits for the period
 * counter, which updates on the click. It does not wait out the page's
 * 400ms event animation. The clock is the automation, not the site.
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import net from "node:net";
import { setTimeout as delay } from "node:timers/promises";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const RUNS = Number(process.env.RUNS ?? 5);
const PASSES = Number(process.env.PASSES ?? 8);
const VIEWPORT = { width: 1600, height: 1200 };

const STEPS = [
  ["2", "02 / 06"],
  ["3", "03 / 06"],
  ["4", "04 / 06"],
  ["5", "05 / 06"],
  ["6", "06 / 06"],
  ["5", "05 / 06"],
];

function now() {
  return performance.now();
}

function round(ms) {
  return Math.round(ms * 10) / 10;
}

function summary(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return {
    median: round(median),
    mean: round(mean),
    min: round(sorted[0]),
    max: round(sorted[sorted.length - 1]),
    n: values.length,
  };
}

function faster(classicMedian, obscuraMedian) {
  if (classicMedian === obscuraMedian) return "tie";
  const winner = classicMedian < obscuraMedian ? "classic headless Chrome" : "obscura";
  const ratio = (Math.max(classicMedian, obscuraMedian) / Math.min(classicMedian, obscuraMedian)).toFixed(2);
  return `${winner} is ${ratio}x faster`;
}

function freePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      server.close(() => resolve(port));
    });
  });
}

async function waitForCdp(port, child, timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  let lastError = "no response";
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Obscura exited before CDP was ready on port ${port}.\n${child.logs ?? ""}`);
    }
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) {
        const version = await response.json();
        if (version.webSocketDebuggerUrl || version.Browser) return version;
        lastError = `unexpected payload ${JSON.stringify(version)}`;
      } else {
        lastError = `HTTP ${response.status}`;
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await delay(20);
  }
  throw new Error(`Obscura CDP on port ${port} was not ready: ${lastError}\n${child.logs ?? ""}`);
}

function startObscura(port) {
  const child = spawn(
    "obscura",
    ["serve", "--port", String(port), "--host", "127.0.0.1", "--allow-private-network", "--quiet"],
    { detached: true, stdio: ["ignore", "pipe", "pipe"] },
  );
  child.logs = "";
  const onData = (chunk) => {
    child.logs += chunk.toString();
  };
  child.stdout?.on("data", onData);
  child.stderr?.on("data", onData);
  return child;
}

function stopObscura(child) {
  if (!child?.pid) return;
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    try {
      child.kill("SIGTERM");
    } catch {
      /* already gone */
    }
  }
}

async function connectObscura(port, child) {
  const version = await waitForCdp(port, child);
  const endpoint = version.webSocketDebuggerUrl ?? `http://127.0.0.1:${port}`;
  return chromium.connectOverCDP(endpoint);
}

async function openPage(browser) {
  let context;
  try {
    context = await browser.newContext({ viewport: VIEWPORT });
  } catch {
    context = browser.contexts()[0] ?? (await browser.newContext());
  }
  const page = await context.newPage();
  page.setDefaultTimeout(8000);
  await page.setViewportSize(VIEWPORT);
  return { context, page };
}

async function closePage(context, page) {
  await page.close().catch(() => {});
  if (context) await context.close().catch(() => {});
}

async function openSlider(page) {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.getByText("01 / 06", { exact: true }).waitFor();
  await page.evaluate(() => {
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { transition: none !important; animation: none !important; }";
    document.documentElement.appendChild(style);
  });
}

async function sliderSteps(page) {
  const clicks = [];
  const counters = [];
  for (let pass = 0; pass < PASSES; pass += 1) {
    for (const [id, progress] of STEPS) {
      const clickStarted = now();
      await page.locator(`button[data-id="${id}"]`).click();
      const clickMs = now() - clickStarted;
      const counterStarted = now();
      await page.getByText(progress, { exact: true }).waitFor();
      const counterMs = now() - counterStarted;
      clicks.push(clickMs);
      counters.push(counterMs);
    }
  }
  return { clicks, counters };
}

function printPair(label, classicValues, obscuraValues, unit) {
  const classic = summary(classicValues);
  const obscura = summary(obscuraValues);
  console.log(`\n${label}`);
  console.log(`  classic headless Chrome  median ${classic.median}${unit}  (mean ${classic.mean}, min ${classic.min}, max ${classic.max}, n=${classic.n})`);
  console.log(`  obscura                  median ${obscura.median}${unit}  (mean ${obscura.mean}, min ${obscura.min}, max ${obscura.max}, n=${obscura.n})`);
  console.log(`  ${faster(classic.median, obscura.median)}`);
}

async function main() {
  const probe = await fetch(BASE_URL).catch((error) => {
    throw new Error(`App is not reachable at ${BASE_URL}.\n${error.message}`);
  });
  if (!probe.ok) throw new Error(`App at ${BASE_URL} returned HTTP ${probe.status}`);

  console.log("Playwright engine comparison");
  console.log("Classic: chromium.launch({ headless: true })");
  console.log("Obscura: connectOverCDP to obscura serve");
  console.log(`Slider steps per run: ${PASSES} passes × ${STEPS.length} clicks. Runs: ${RUNS}, plus 1 warmup.`);
  console.log("Transitions are disabled. Each step is click, then the period counter. The 400ms event animation is not waited on.");

  const port = await freePort();
  const obscuraStarted = now();
  const obscuraProcess = startObscura(port);
  let classic;
  let obscura;

  const warmClicks = { classic: [], obscura: [] };
  const warmCounters = { classic: [], obscura: [] };

  try {
    const classicStarted = now();
    const [launched, connected] = await Promise.all([
      chromium.launch({ headless: true }).then((browser) => ({ browser, ms: now() - classicStarted })),
      connectObscura(port, obscuraProcess).then((browser) => ({ browser, ms: now() - obscuraStarted })),
    ]);
    classic = launched.browser;
    obscura = connected.browser;

    console.log(`\nBrowser already measured once, before the slider loop:`);
    console.log(`  classic launch     ${round(launched.ms)} ms  (${classic.version()})`);
    console.log(`  obscura ready      ${round(connected.ms)} ms`);

    const warmBrowser = async (browser) => {
      const opened = await openPage(browser);
      try {
        await openSlider(opened.page);
        for (const [id, progress] of STEPS) {
          await opened.page.locator(`button[data-id="${id}"]`).click();
          await opened.page.getByText(progress, { exact: true }).waitFor();
        }
      } finally {
        await closePage(opened.context, opened.page);
      }
    };

    process.stdout.write("Warmup");
    await warmBrowser(classic);
    await warmBrowser(obscura);
    console.log(" done");

    for (let run = 0; run < RUNS; run += 1) {
      process.stdout.write(`Run ${run + 1}/${RUNS}`);
      const totals = {};
      for (const [name, browser, bucketClicks, bucketCounters] of [
        ["classic", classic, warmClicks.classic, warmCounters.classic],
        ["obscura", obscura, warmClicks.obscura, warmCounters.obscura],
      ]) {
        const opened = await openPage(browser);
        try {
          await openSlider(opened.page);
          const sample = await sliderSteps(opened.page);
          bucketClicks.push(...sample.clicks);
          bucketCounters.push(...sample.counters);
          totals[name] = sample.clicks.reduce((sum, value) => sum + value, 0)
            + sample.counters.reduce((sum, value) => sum + value, 0);
          if (name === "obscura") {
            console.log(`  classic ${round(totals.classic)} ms, obscura ${round(totals.obscura)} ms`);
          }
        } catch (error) {
          const body = await opened.page.locator("body").innerText().catch(() => "");
          const message = error instanceof Error ? error.message : String(error);
          throw new Error(`${name} run ${run + 1} failed: ${message}\n--- page text ---\n${body.slice(0, 800)}`);
        } finally {
          await closePage(opened.context, opened.page);
        }
      }
    }
  } finally {
    await obscura?.close().catch(() => {});
    await classic?.close().catch(() => {});
    stopObscura(obscuraProcess);
    await delay(200);
  }

  printPair("Playwright click() on a slider period", warmClicks.classic, warmClicks.obscura, " ms");
  printPair("Wait until the period counter matches", warmCounters.classic, warmCounters.obscura, " ms");

  const classicStep = warmClicks.classic.map((click, index) => click + warmCounters.classic[index]);
  const obscuraStep = warmClicks.obscura.map((click, index) => click + warmCounters.obscura[index]);
  printPair("Full slider step (click + counter)", classicStep, obscuraStep, " ms");

  const classicRate = 1000 / summary(classicStep).median;
  const obscuraRate = 1000 / summary(obscuraStep).median;
  console.log(`\nSlider steps per second, from the median step:`);
  console.log(`  classic headless Chrome  ${classicRate.toFixed(1)}`);
  console.log(`  obscura                  ${obscuraRate.toFixed(1)}`);
  console.log(`  ${faster(1 / classicRate, 1 / obscuraRate)}`);

  const cold = { classic: [], obscura: [] };
  for (let run = 0; run < RUNS; run += 1) {
    const classicStarted = now();
    const browser = await chromium.launch({ headless: true });
    cold.classic.push(now() - classicStarted);
    await browser.close();

    const coldPort = await freePort();
    const started = now();
    const child = startObscura(coldPort);
    let connected;
    try {
      connected = await connectObscura(coldPort, child);
      cold.obscura.push(now() - started);
    } finally {
      await connected?.close().catch(() => {});
      stopObscura(child);
      await delay(150);
    }
    console.log(`Cold start ${run + 1}/${RUNS}  classic ${round(cold.classic[run])} ms, obscura ${round(cold.obscura[run])} ms`);
  }

  printPair("Cold start, until Playwright has a browser", cold.classic, cold.obscura, " ms");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
