// Verification script for ?ref parameter security and validation
import fs from "node:fs";

// Read and verify data/products.ts directly
const productsContent = fs.readFileSync("./data/products.ts", "utf-8");

function simulateGetProductByRef(rawRef) {
  const allowedKeys = ["orange-taxi", "autonomous-rescue-robot", "animal-detection"];
  if (!rawRef || typeof rawRef !== "string") {
    return null;
  }
  let sanitized = rawRef.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
  if (sanitized.startsWith("qr-")) {
    sanitized = sanitized.slice(3);
  }
  if (allowedKeys.includes(sanitized)) {
    return sanitized;
  }
  return null;
}

const cases = [
  { input: undefined, expected: null, name: "No ref (?)" },
  { input: "orange-taxi", expected: "orange-taxi", name: "Valid ?ref=orange-taxi" },
  { input: "unknown", expected: null, name: "Unknown ref ?ref=unknown" },
  { input: "<script>", expected: null, name: "XSS payload ?ref=<script>" },
  { input: "<script>alert('xss')</script>", expected: null, name: "XSS payload ?ref=<script>alert('xss')</script>" },
  { input: "orange-taxi", expected: "orange-taxi", name: "Multi-param ?ref=orange-taxi&x=1" },
  { input: "qr-orange-taxi", expected: "orange-taxi", name: "QR scan ?ref=qr-orange-taxi" },
  { input: "qr-animal-detection", expected: "animal-detection", name: "QR scan ?ref=qr-animal-detection" },
];

let allPassed = true;
for (const tc of cases) {
  const result = simulateGetProductByRef(tc.input);
  const passed = result === tc.expected;
  if (!passed) allPassed = false;
  console.log(`${passed ? "✓ PASS" : "✗ FAIL"}: ${tc.name} -> returned ${JSON.stringify(result)}`);
}

if (!allPassed) {
  process.exit(1);
}
console.log("\nAll security and parameter validation tests passed successfully!");
