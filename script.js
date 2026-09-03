const form = document.getElementById("setupForm");

const unikeyInput = document.getElementById("unikey");

const emailInput = document.getElementById("email");

const repoName = document.getElementById("repoName");

const unikeyError = document.getElementById("unikeyError");

const outputSection = document.getElementById("outputSection");

const commandOutput = document.getElementById("commandOutput");

const copyButton = document.getElementById("copyButton");

const terminalType = document.getElementById("terminalType");

const setupView = document.getElementById("setupView");

const roundView = document.getElementById("roundView");

const roundTitle = document.getElementById("roundTitle");

const roundBadge = document.getElementById("roundBadge");

const roundContext = document.getElementById("roundContext");

const selectedMemberLabel = document.getElementById("selectedMemberLabel");

const memberButtons = document.querySelectorAll(".member-button");

const navigationButtons = document.querySelectorAll(".nav-button");

const studentRadios = document.querySelectorAll('input[name="studentName"]');

const assignmentMessage = document.getElementById("assignmentMessage");

const assignmentMember = document.getElementById("assignmentMember");

const assignmentRound = document.getElementById("assignmentRound");

const assignmentClass = document.getElementById("assignmentClass");

const assignmentMethod = document.getElementById("assignmentMethod");

const assignmentSource = document.getElementById("assignmentSource");

const assignmentTest = document.getElementById("assignmentTest");

const assignmentBranch = document.getElementById("assignmentBranch");

const featureWorkflowSteps = document.querySelectorAll("[data-feature-step]");

const repositoryStateNote = document.getElementById("repositoryStateNote");

const startFeatureCommands = document.getElementById("startFeatureCommands");

const productionCodeLabel = document.getElementById("productionCodeLabel");

const productionInstruction = document.getElementById("productionInstruction");

const productionCode = document.getElementById("productionCode");

const testFileNote = document.getElementById("testFileNote");

const testCodeLabel = document.getElementById("testCodeLabel");

const testCode = document.getElementById("testCode");

const changelogLine = document.getElementById("changelogLine");

const changelogInstruction = document.getElementById("changelogInstruction");

const commitPushCommands = document.getElementById("commitPushCommands");

const integrationCommands = document.getElementById("integrationCommands");

const integrationTestNote = document.getElementById("integrationTestNote");

const releaseVersionNote = document.getElementById("releaseVersionNote");

const releaseCommands = document.getElementById("releaseCommands");

const syncCommands = document.getElementById("syncCommands");

const workflowCopyButtons = document.querySelectorAll("[data-copy-target]");

const testModeToggle = document.getElementById("testModeToggle");

const testModeBanner = document.getElementById("testModeBanner");

const resolvedTargets = document.getElementById("resolvedTargets");

const resolvedTeamRepo = document.getElementById("resolvedTeamRepo");

const resolvedPersonalRepo = document.getElementById("resolvedPersonalRepo");

const resolvedGitEmail = document.getElementById("resolvedGitEmail");

const integrationLocationLabel = document.getElementById("integrationLocationLabel");

const releaseLocationLabel = document.getElementById("releaseLocationLabel");

const syncLocationLabel = document.getElementById("syncLocationLabel");

const finalisationStep = document.getElementById("finalisationStep");

const finalisationMessage = document.getElementById("finalisationMessage");

const finalisationContent = document.getElementById("finalisationContent");

const finalisationCommands = document.getElementById("finalisationCommands");

const finalReleaseStep = document.getElementById("finalReleaseStep");

const finalReleaseMessage = document.getElementById("finalReleaseMessage");

const finalReleaseContent = document.getElementById("finalReleaseContent");

const finalReleaseCommands = document.getElementById("finalReleaseCommands");

const finalPersonalSyncStep = document.getElementById("finalPersonalSyncStep");

const finalPersonalSyncMessage = document.getElementById("finalPersonalSyncMessage");

const finalPersonalSyncContent = document.getElementById("finalPersonalSyncContent");

const finalPersonalSyncCommands = document.getElementById("finalPersonalSyncCommands");

let selectedMember = "";

let currentRound = 1;

const REPOSITORY_CONFIG = {
  host: "github.sydney.edu.au",
  organization: "SOFT2412-COMP9412-2026s2",
  personalRepoPrefix: "A1-T27-43-",
  production: {
    teamRepoName: "A1-T27-43-IM",
    imFolderName: "im-A1-T27-43",
  },
  test: {
    teamRepoName: "A1-T27-43-IM-DUMMY",
    imFolderName: "im-A1-T27-43-DUMMY",
    gitEmail: "rsha0537@uni.sydney.edu.au",
    historicalCoverageMissedLines: {
      App: 0,
      CurrencyConverter: 2,
      DataValidator: 2,
      UserInterface: 8,
    },
  },
};

const FINALISATION_CONFIG = {
  responsibleRole: "finalisationOwner",
  existingReleaseTag: "v0.4.0",
  existingBuildVersion: "0.4.0",
  junitJar: "lib/junit-platform-console-standalone-1.14.4.jar",
  coverageClasses: ["App", "CurrencyConverter", "DataValidator", "UserInterface"],
};

const TEAM_MEMBERS = [
  {
    name: "Daniel Kostandy",
    roles: [],
    unikeys: { test: "rsha0000", production: "" },
    contribution: "Implemented currency conversion, exchange-rate derivation, and two-decimal rounding.",
  },
  {
    name: "Raj Shah",
    roles: ["finalisationOwner"],
    unikeys: { test: "rsha1111", production: "rsha0537" },
    contribution: "Implemented the allocated application start loop, menu display, and exchange-rate display. Also completed the shared App.main() application bootstrap required to launch the console interface.",
  },
  {
    name: "Tiya Agrawal",
    roles: [],
    unikeys: { test: "rsha2222", production: "" },
    contribution: "Implemented supported-currency listing and the interactive conversion workflow.",
  },
  {
    name: "Natasha Sutanto",
    roles: [],
    unikeys: { test: "rsha3333", production: "" },
    contribution: "Implemented currency validation and currency-code normalization.",
  },
  {
    name: "Mohammad",
    roles: [],
    unikeys: { test: "rsha4444", production: "" },
    contribution: "Implemented amount validation and numeric amount parsing.",
  },
];

const FINAL_MAKEFILE = `JUNIT_JAR := ${FINALISATION_CONFIG.junitJar}
MAIN_OUT := build/make/classes
TEST_OUT := build/make/test-classes
APP_CLASS := $(MAIN_OUT)/App.class
UI_CLASS := $(MAIN_OUT)/UserInterface.class
CONVERTER_CLASS := $(MAIN_OUT)/CurrencyConverter.class
VALIDATOR_CLASS := $(MAIN_OUT)/DataValidator.class
TEST_SOURCES := $(wildcard src/test/java/*.java)
TEST_STAMP := $(TEST_OUT)/.compiled

.PHONY: compile test clean

compile: $(APP_CLASS)

$(MAIN_OUT):
\tmkdir -p $(MAIN_OUT)

$(TEST_OUT):
\tmkdir -p $(TEST_OUT)

$(CONVERTER_CLASS): src/main/java/CurrencyConverter.java | $(MAIN_OUT)
\tjavac --release 17 -cp "$(MAIN_OUT)" -d $(MAIN_OUT) src/main/java/CurrencyConverter.java

$(VALIDATOR_CLASS): src/main/java/DataValidator.java | $(MAIN_OUT)
\tjavac --release 17 -cp "$(MAIN_OUT)" -d $(MAIN_OUT) src/main/java/DataValidator.java

$(UI_CLASS): src/main/java/UserInterface.java $(CONVERTER_CLASS) $(VALIDATOR_CLASS) | $(MAIN_OUT)
\tjavac --release 17 -cp "$(MAIN_OUT)" -d $(MAIN_OUT) src/main/java/UserInterface.java

$(APP_CLASS): src/main/java/App.java $(UI_CLASS) | $(MAIN_OUT)
\tjavac --release 17 -cp "$(MAIN_OUT)" -d $(MAIN_OUT) src/main/java/App.java

$(TEST_STAMP): $(TEST_SOURCES) $(APP_CLASS) $(UI_CLASS) $(CONVERTER_CLASS) $(VALIDATOR_CLASS) | $(TEST_OUT)
\ttest -f $(JUNIT_JAR)
\tjavac --release 17 -cp "$(JUNIT_JAR):$(MAIN_OUT)" -d $(TEST_OUT) $(TEST_SOURCES)
\ttouch $(TEST_STAMP)

test: $(TEST_STAMP)
\tjava -jar $(JUNIT_JAR) execute --class-path "$(MAIN_OUT):$(TEST_OUT)" --scan-class-path

clean:
\trm -rf build/make`;

const MAKE_INCREMENTAL_VALIDATION_PYTHON = `import os
import subprocess
import time

cases = [
    ("src/main/java/CurrencyConverter.java", ["CurrencyConverter.class", "UserInterface.class", "App.class"]),
    ("src/main/java/DataValidator.java", ["DataValidator.class", "UserInterface.class", "App.class"]),
    ("src/main/java/UserInterface.java", ["UserInterface.class", "App.class"]),
    ("src/main/java/App.java", ["App.class"]),
]
class_dir = "build/make/classes"
sources = [source for source, _ in cases]
original_times = {source: os.stat(source) for source in sources}
try:
    required = ["CurrencyConverter.class", "DataValidator.class", "UserInterface.class", "App.class"]
    missing = [name for name in required if not os.path.isfile(os.path.join(class_dir, name))]
    if missing:
        raise RuntimeError("make compile did not create: " + ", ".join(missing))
    for source, expected_classes in cases:
        before = {name: os.stat(os.path.join(class_dir, name)).st_mtime_ns for name in expected_classes}
        source_stat = os.stat(source)
        future = max(time.time_ns(), source_stat.st_mtime_ns) + 2_000_000_000
        os.utime(source, ns=(source_stat.st_atime_ns, future))
        subprocess.run(["make", "compile"], check=True)
        not_rebuilt = [name for name in expected_classes
                       if os.stat(os.path.join(class_dir, name)).st_mtime_ns <= before[name]]
        if not_rebuilt:
            raise RuntimeError(source + " did not rebuild: " + ", ".join(not_rebuilt))
finally:
    for source, stat in original_times.items():
        os.utime(source, ns=(stat.st_atime_ns, stat.st_mtime_ns))
print("Makefile incremental dependency graph validated.")`;

function resolveRepositoryTargets(unikeyValue = "") {
  const unikey = cleanUnikey(unikeyValue);
  const mode = testModeToggle.checked
    ? REPOSITORY_CONFIG.test
    : REPOSITORY_CONFIG.production;
  const unikeyPart = unikey || "<unikey>";
  const personalRepoName = `${REPOSITORY_CONFIG.personalRepoPrefix}${unikeyPart}`;
  const repositoryBase = `git@${REPOSITORY_CONFIG.host}:${REPOSITORY_CONFIG.organization}`;

  return {
    isTestMode: testModeToggle.checked,
    teamRepoName: mode.teamRepoName,
    teamRepoUrl: `${repositoryBase}/${mode.teamRepoName}.git`,
    imFolderName: mode.imFolderName,
    gitEmail: mode.gitEmail || (unikey ? `${unikey}@uni.sydney.edu.au` : "<unikey>@uni.sydney.edu.au"),
    personalRepoName,
    personalRepoUrl: `${repositoryBase}/${personalRepoName}.git`,
    personalFolderName: personalRepoName,
  };
}

const ASSIGNMENT_DATA = {
  releaseVersions: {
    starter: "v0.1.0",
    1: "v0.2.0",
    2: "v0.3.0",
    3: "v0.4.0",
    final: "v1.0.0",
  },
  classes: {
    CurrencyConverter: {
      sourceFile: "src/main/java/CurrencyConverter.java",
      testFile: "src/test/java/CurrencyConverterTest.java",
    },
    UserInterface: {
      sourceFile: "src/main/java/UserInterface.java",
      testFile: "src/test/java/UserInterfaceTest.java",
    },
    DataValidator: {
      sourceFile: "src/main/java/DataValidator.java",
      testFile: "src/test/java/DataValidatorTest.java",
    },
  },
  rounds: {
    1: {
      "Daniel Kostandy": {
        member: "Daniel", className: "CurrencyConverter", method: "roundToTwoDecimals", branch: "feature/round-to-two-decimals",
        productionInstruction: "Replace roundToTwoDecimals(double value) in CurrencyConverter.java.",
        productionSnippet: `public double roundToTwoDecimals(double value) {
    return Math.round(value * 100.0) / 100.0;
}`,
        testInstruction: "Replace testRoundToTwoDecimals() in CurrencyConverterTest.java. The snippet uses the existing JUnit 5 @Test import and fully qualified assertions.",
        testMethods: ["testRoundToTwoDecimals"],
        testSnippet: `@Test
public void testRoundToTwoDecimals() {
    CurrencyConverter converter = new CurrencyConverter();

    org.junit.jupiter.api.Assertions.assertEquals(1.18,
            converter.roundToTwoDecimals(1.1764705), 0.000001);
    org.junit.jupiter.api.Assertions.assertEquals(0.88,
            converter.roundToTwoDecimals(0.8823529), 0.000001);
    org.junit.jupiter.api.Assertions.assertEquals(85.0,
            converter.roundToTwoDecimals(85.0), 0.000001);
}`,
        shortDescription: "rounds a value to two decimal places",
        changelog: "- roundToTwoDecimals(): rounds a value to two decimal places -- Daniel Kostandy",
        commitSubject: "Implement two-decimal rounding",
        commitBody: "Implement roundToTwoDecimals using numeric rounding and replace its JUnit tests with required examples.",
      },
      "Raj Shah": {
        member: "Raj", className: "UserInterface", method: "showExchangeRates", branch: "feature/show-exchange-rates",
        productionInstruction: "ALLOCATED FEATURE: Replace UserInterface.showExchangeRates(). SHARED BOOTSTRAP: Also complete App.main() as shown below so the console interface can launch. App.main() is shared team work in this branch, not part of the formal 12-method allocation.",
        productionSnippet: `public void showExchangeRates() {
    System.out.println("Exchange Rates (base = 1 unit)");
    String[] currencies = converter.getSupportedCurrencies();
    System.out.printf("%-8s", "");
    for (String currency : currencies) {
        System.out.printf("%8s", currency);
    }
    System.out.println();
    for (String fromCurrency : currencies) {
        System.out.printf("%-8s", fromCurrency);
        for (String toCurrency : currencies) {
            double rate = converter.getExchangeRate(fromCurrency, toCurrency);
            System.out.printf("%8.2f", converter.roundToTwoDecimals(rate));
        }
        System.out.println();
    }
}`,
        additionalProductionFiles: [{ file: "src/main/java/App.java", method: "main", snippet: `public static void main(String[] args) {
    UserInterface ui = new UserInterface();
    ui.start();
}` }],
        testInstruction: "Replace testShowExchangeRates() in UserInterfaceTest.java and testMain() in the existing AppTest.java. AppTest supplies input 3 so App.main starts the real UI and exits. No additional imports are required.",
        testMethods: ["testShowExchangeRates", "AppTest.testMain"],
        testSnippet: `@Test
public void testShowExchangeRates() {
    java.io.PrintStream originalOut = System.out;
    java.io.ByteArrayOutputStream output = new java.io.ByteArrayOutputStream();

    try {
        System.setOut(new java.io.PrintStream(output));
        UserInterface ui = new UserInterface();
        ui.showExchangeRates();
    } finally {
        System.setOut(originalOut);
    }

    String expected = String.join(System.lineSeparator(),
            "Exchange Rates (base = 1 unit)",
            "             USD     EUR     GBP     AUD",
            "USD         1.00    0.85    0.75    1.30",
            "EUR         1.18    1.00    0.88    1.53",
            "GBP         1.33    1.13    1.00    1.73",
            "AUD         0.77    0.65    0.58    1.00") + System.lineSeparator();
    org.junit.jupiter.api.Assertions.assertEquals(expected, output.toString());
}`,
        additionalTestFiles: [{ file: "src/test/java/AppTest.java", methods: ["testMain"], snippet: `@Test
public void testMain() {
    java.io.InputStream originalIn = System.in;
    java.io.PrintStream originalOut = System.out;
    java.io.ByteArrayOutputStream output = new java.io.ByteArrayOutputStream();
    try {
        System.setIn(new java.io.ByteArrayInputStream(
                "3\\n".getBytes(java.nio.charset.StandardCharsets.UTF_8)));
        System.setOut(new java.io.PrintStream(output));
        App.main(new String[0]);
    } finally {
        System.setIn(originalIn);
        System.setOut(originalOut);
    }
    String text = output.toString();
    org.junit.jupiter.api.Assertions.assertTrue(text.startsWith("=== Currency Converter ==="));
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("Enter choice: "));
    org.junit.jupiter.api.Assertions.assertTrue(text.endsWith("Goodbye." + System.lineSeparator()));
}` }],
        shortDescription: "displays all supported exchange-rate pairs",
        changelog: "- showExchangeRates(): displays the required exchange-rate table -- Raj Shah",
        changelogEntries: [
          "- showExchangeRates(): displays the required exchange-rate table -- Raj Shah",
          "- App.main(): launches the console interface as shared application bootstrap -- Raj Shah",
        ],
        commitSubject: "Display exchange-rate table and bootstrap app",
        commitBody: "Implement showExchangeRates with the required derived-rate table and complete the shared App.main application bootstrap.",
      },
      "Tiya Agrawal": {
        member: "Tiya", className: "UserInterface", method: "handleConversion", branch: "feature/handle-conversion",
        productionInstruction: "Replace handleConversion() in UserInterface.java.",
        productionSnippet: `public void handleConversion() {
    System.out.print("Enter amount: ");
    String amountInput = scanner.nextLine();
    if (!validator.isValidAmount(amountInput)) {
        System.out.println("Invalid amount. Enter a positive number.");
        return;
    }

    System.out.print("From currency (USD/EUR/GBP/AUD): ");
    String fromCurrency = validator.normalizeCurrency(scanner.nextLine());
    System.out.print("To currency (USD/EUR/GBP/AUD): ");
    String toCurrency = validator.normalizeCurrency(scanner.nextLine());
    if (!validator.isValidCurrency(fromCurrency) || !validator.isValidCurrency(toCurrency)) {
        System.out.println("Invalid currency. Use USD, EUR, GBP or AUD.");
        return;
    }

    double amount = validator.parseAmount(amountInput);
    double converted = converter.convert(amount, fromCurrency, toCurrency);
    double displayAmount = converter.roundToTwoDecimals(converted);
    System.out.printf("Result: %.2f %s = %.2f %s%n",
            amount, fromCurrency, displayAmount, toCurrency);
}`,
        testInstruction: "Replace testHandleConversion() and add the three focused invalid-input tests in UserInterfaceTest.java. Every test replaces System.in before UserInterface construction and restores System.in/System.out in a finally block. No additional imports are required.",
        testMethods: ["testHandleConversion", "testHandleConversionRejectsInvalidAmount", "testHandleConversionRejectsInvalidSourceCurrency", "testHandleConversionRejectsInvalidTargetCurrency"],
        testSnippet: `@Test
public void testHandleConversion() {
    java.io.InputStream originalIn = System.in;
    java.io.PrintStream originalOut = System.out;
    java.io.ByteArrayInputStream input = new java.io.ByteArrayInputStream(
            "100\\nusd\\neur\\n".getBytes(java.nio.charset.StandardCharsets.UTF_8));
    java.io.ByteArrayOutputStream output = new java.io.ByteArrayOutputStream();

    try {
        System.setIn(input);
        System.setOut(new java.io.PrintStream(output));
        UserInterface ui = new UserInterface();
        ui.handleConversion();
    } finally {
        System.setIn(originalIn);
        System.setOut(originalOut);
    }

    org.junit.jupiter.api.Assertions.assertTrue(
            output.toString().contains("Result: 100.00 USD = 85.00 EUR"));
}

@Test
public void testHandleConversionRejectsInvalidAmount() {
    java.io.InputStream originalIn = System.in;
    java.io.PrintStream originalOut = System.out;
    java.io.ByteArrayOutputStream output = new java.io.ByteArrayOutputStream();
    try {
        System.setIn(new java.io.ByteArrayInputStream(
                "abc\\n".getBytes(java.nio.charset.StandardCharsets.UTF_8)));
        System.setOut(new java.io.PrintStream(output));
        new UserInterface().handleConversion();
    } finally {
        System.setIn(originalIn);
        System.setOut(originalOut);
    }
    String text = output.toString();
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("Invalid amount. Enter a positive number."));
    org.junit.jupiter.api.Assertions.assertFalse(text.contains("From currency (USD/EUR/GBP/AUD):"));
}

@Test
public void testHandleConversionRejectsInvalidSourceCurrency() {
    java.io.InputStream originalIn = System.in;
    java.io.PrintStream originalOut = System.out;
    java.io.ByteArrayOutputStream output = new java.io.ByteArrayOutputStream();
    try {
        System.setIn(new java.io.ByteArrayInputStream(
                "100\\nXYZ\\nEUR\\n".getBytes(java.nio.charset.StandardCharsets.UTF_8)));
        System.setOut(new java.io.PrintStream(output));
        new UserInterface().handleConversion();
    } finally {
        System.setIn(originalIn);
        System.setOut(originalOut);
    }
    String text = output.toString();
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("From currency (USD/EUR/GBP/AUD): "));
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("To currency (USD/EUR/GBP/AUD): "));
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("Invalid currency. Use USD, EUR, GBP or AUD."));
}

@Test
public void testHandleConversionRejectsInvalidTargetCurrency() {
    java.io.InputStream originalIn = System.in;
    java.io.PrintStream originalOut = System.out;
    java.io.ByteArrayOutputStream output = new java.io.ByteArrayOutputStream();
    try {
        System.setIn(new java.io.ByteArrayInputStream(
                "100\\nUSD\\nXYZ\\n".getBytes(java.nio.charset.StandardCharsets.UTF_8)));
        System.setOut(new java.io.PrintStream(output));
        new UserInterface().handleConversion();
    } finally {
        System.setIn(originalIn);
        System.setOut(originalOut);
    }
    String text = output.toString();
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("To currency (USD/EUR/GBP/AUD): "));
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("Invalid currency. Use USD, EUR, GBP or AUD."));
}`,
        shortDescription: "validates input and performs an interactive conversion",
        changelog: "- handleConversion(): validates input and performs an interactive conversion -- Tiya Agrawal",
        commitSubject: "Implement interactive conversion",
        commitBody: "Implement handleConversion using DataValidator and CurrencyConverter and replace its controlled-input console test.",
      },
      "Natasha Sutanto": {
        member: "Natasha", className: "DataValidator", method: "normalizeCurrency", branch: "feature/normalize-currency",
        productionInstruction: "Replace normalizeCurrency(String currency) in DataValidator.java.",
        productionSnippet: `public String normalizeCurrency(String currency) {
    if (currency == null) {
        return null;
    }
    return currency.trim().toUpperCase();
}`,
        testInstruction: "Replace testNormalizeCurrency() in DataValidatorTest.java so the existing normalization cases and the null boundary are owned by this feature. No additional imports are required.",
        testMethods: ["testNormalizeCurrency"],
        testSnippet: `@Test
public void testNormalizeCurrency() {
    DataValidator validator = new DataValidator();
    org.junit.jupiter.api.Assertions.assertEquals("USD", validator.normalizeCurrency("usd"));
    org.junit.jupiter.api.Assertions.assertEquals("EUR", validator.normalizeCurrency("  eur  "));
    org.junit.jupiter.api.Assertions.assertEquals("GBP", validator.normalizeCurrency("Gbp"));
    org.junit.jupiter.api.Assertions.assertNull(validator.normalizeCurrency(null));
}`,
        shortDescription: "trims and uppercases currency codes",
        changelog: "- normalizeCurrency(): trims and uppercases currency codes -- Natasha Sutanto",
        commitSubject: "Normalize currency codes",
        commitBody: "Implement null-safe currency normalization while preserving the existing DataValidator test architecture.",
      },
      Mohammad: {
        member: "Mohammad", className: "DataValidator", method: "parseAmount", branch: "feature/parse-amount",
        productionInstruction: "Replace parseAmount(String amountStr) in DataValidator.java.",
        productionSnippet: `public double parseAmount(String amountStr) {
    if (amountStr == null) {
        return 0.0;
    }

    try {
        return Double.parseDouble(amountStr.trim());
    } catch (NumberFormatException exception) {
        return 0.0;
    }
}`,
        testInstruction: "Replace testParseAmount() in DataValidatorTest.java so the valid, invalid, and null cases are owned by this feature. No additional imports are required.",
        testMethods: ["testParseAmount"],
        testSnippet: `@Test
public void testParseAmount() {
    DataValidator validator = new DataValidator();
    org.junit.jupiter.api.Assertions.assertEquals(100.0, validator.parseAmount("100"), 0.000001);
    org.junit.jupiter.api.Assertions.assertEquals(50.75, validator.parseAmount("50.75"), 0.000001);
    org.junit.jupiter.api.Assertions.assertEquals(0.0, validator.parseAmount("invalid"), 0.000001);
    org.junit.jupiter.api.Assertions.assertEquals(0.0, validator.parseAmount(null), 0.000001);
}`,
        shortDescription: "parses valid amounts and returns zero for invalid input",
        changelog: "- parseAmount(): parses valid amounts and returns zero for invalid input -- Mohammad",
        commitSubject: "Parse validated amounts",
        commitBody: "Implement parseAmount independently with null and invalid-input handling and retain the existing shared DataValidator tests.",
      },
    },
    2: {
      "Daniel Kostandy": {
        member: "Daniel", className: "CurrencyConverter", method: "getExchangeRate", branch: "feature/get-exchange-rate",
        productionInstruction: "Replace getExchangeRate(String fromCurrency, String toCurrency) in CurrencyConverter.java. The starter specifies supported currencies only; returning 0.0 for null/unsupported input is a control-flow fallback, not an assignment requirement.",
        productionSnippet: `public double getExchangeRate(String fromCurrency, String toCurrency) {
    if (fromCurrency == null || toCurrency == null) {
        return 0.0;
    }

    String from = fromCurrency.trim().toUpperCase();
    String to = toCurrency.trim().toUpperCase();

    double fromUsdRate = switch (from) {
        case "USD" -> 1.0;
        case "EUR" -> 0.85;
        case "GBP" -> 0.75;
        case "AUD" -> 1.30;
        default -> 0.0;
    };
    double toUsdRate = switch (to) {
        case "USD" -> 1.0;
        case "EUR" -> 0.85;
        case "GBP" -> 0.75;
        case "AUD" -> 1.30;
        default -> 0.0;
    };

    if (fromUsdRate == 0.0 || toUsdRate == 0.0) {
        return 0.0;
    }

    return toUsdRate / fromUsdRate;
}`,
        testInstruction: "Replace testGetExchangeRate() in CurrencyConverterTest.java. The snippet uses the existing JUnit 5 @Test import and fully qualified assertions.",
        testMethods: ["testGetExchangeRate"],
        testSnippet: `@Test
public void testGetExchangeRate() {
    CurrencyConverter converter = new CurrencyConverter();

    org.junit.jupiter.api.Assertions.assertEquals(0.85,
            converter.getExchangeRate("USD", "EUR"), 0.000001);
    org.junit.jupiter.api.Assertions.assertEquals(1.0,
            converter.getExchangeRate("GBP", "GBP"), 0.000001);
    org.junit.jupiter.api.Assertions.assertEquals(0.75 / 0.85,
            converter.getExchangeRate("EUR", "GBP"), 0.000001);
    org.junit.jupiter.api.Assertions.assertEquals(1.30 / 0.75,
            converter.getExchangeRate("GBP", "AUD"), 0.000001);
    org.junit.jupiter.api.Assertions.assertEquals(0.0,
            converter.getExchangeRate(null, "USD"), 0.000001);
    org.junit.jupiter.api.Assertions.assertEquals(0.0,
            converter.getExchangeRate("USD", null), 0.000001);
    org.junit.jupiter.api.Assertions.assertEquals(0.0,
            converter.getExchangeRate("XYZ", "USD"), 0.000001);
    org.junit.jupiter.api.Assertions.assertEquals(0.0,
            converter.getExchangeRate("USD", "XYZ"), 0.000001);
}`,
        shortDescription: "derives exchange rates from fixed USD base rates",
        changelog: "- getExchangeRate(): derives exchange rates from fixed USD base rates -- Daniel Kostandy",
        commitSubject: "Derive currency exchange rates",
        commitBody: "Implement getExchangeRate from the four unrounded USD base rates and replace its cross-rate tests.",
      },
      "Raj Shah": {
        member: "Raj", className: "UserInterface", method: "showMenu", branch: "feature/show-menu",
        productionInstruction: "Replace showMenu() in UserInterface.java.",
        productionSnippet: `public void showMenu() {
    System.out.println("1. Convert Currency");
    System.out.println("2. View Exchange Rates");
    System.out.println("3. Exit");
}`,
        testInstruction: "Replace testShowMenu() in UserInterfaceTest.java. No additional imports are required because the snippet uses fully qualified java.io and JUnit class names.",
        testMethods: ["testShowMenu"],
        testSnippet: `@Test
public void testShowMenu() {
    java.io.PrintStream originalOut = System.out;
    java.io.ByteArrayOutputStream output = new java.io.ByteArrayOutputStream();

    try {
        System.setOut(new java.io.PrintStream(output));
        UserInterface ui = new UserInterface();
        ui.showMenu();
    } finally {
        System.setOut(originalOut);
    }

    String text = output.toString();
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("1. Convert Currency"));
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("2. View Exchange Rates"));
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("3. Exit"));
}`,
        shortDescription: "displays the three application menu options",
        changelog: "- showMenu(): displays the three application menu options -- Raj Shah",
        commitSubject: "Display application menu",
        commitBody: "Implement showMenu with deterministic console options and replace its output test.",
      },
      "Tiya Agrawal": {
        member: "Tiya", className: "CurrencyConverter", method: "getSupportedCurrencies", branch: "feature/get-supported-currencies",
        productionInstruction: "Replace getSupportedCurrencies() in CurrencyConverter.java.",
        productionSnippet: `public String[] getSupportedCurrencies() {
    return new String[]{"USD", "EUR", "GBP", "AUD"};
}`,
        testInstruction: "Replace testGetSupportedCurrencies() in CurrencyConverterTest.java. The snippet uses the existing JUnit 5 @Test import and a fully qualified assertion.",
        testMethods: ["testGetSupportedCurrencies"],
        testSnippet: `@Test
public void testGetSupportedCurrencies() {
    CurrencyConverter converter = new CurrencyConverter();

    org.junit.jupiter.api.Assertions.assertArrayEquals(
            new String[]{"USD", "EUR", "GBP", "AUD"},
            converter.getSupportedCurrencies());
}`,
        shortDescription: "returns the four supported currency codes",
        changelog: "- getSupportedCurrencies(): returns the four supported currency codes -- Tiya Agrawal",
        commitSubject: "Return supported currencies",
        commitBody: "Implement getSupportedCurrencies with the required USD, EUR, GBP, and AUD order and replace its test.",
      },
      "Natasha Sutanto": {
        member: "Natasha", className: "DataValidator", method: "isValidCurrency", branch: "feature/is-valid-currency",
        productionInstruction: "Replace isValidCurrency(String currency) in DataValidator.java.",
        productionSnippet: `public boolean isValidCurrency(String currency) {
    if (currency == null) {
        return false;
    }

    String normalized = normalizeCurrency(currency);
    return normalized.equals("USD")
            || normalized.equals("EUR")
            || normalized.equals("GBP")
            || normalized.equals("AUD");
}`,
        testInstruction: "Use the existing starter tests testValidCurrencies(), testInvalidCurrencies(), and testCaseInsensitiveCurrency() in DataValidatorTest.java. No test replacement, new method-specific test, or additional import is required.",
        testMethods: [],
        testReference: "Existing starter tests: testValidCurrencies, testInvalidCurrencies, and testCaseInsensitiveCurrency.",
        testSnippet: "",
        shortDescription: "validates supported currency codes case-insensitively",
        changelog: "- isValidCurrency(): validates supported currency codes case-insensitively -- Natasha Sutanto",
        commitSubject: "Validate currency codes",
        commitBody: "Implement null-safe, case-insensitive supported-currency validation and retain the existing shared tests.",
      },
      Mohammad: {
        member: "Mohammad", className: "DataValidator", method: "isValidAmount", branch: "feature/is-valid-amount",
        productionInstruction: "Replace isValidAmount(String amountStr) in DataValidator.java.",
        productionSnippet: `public boolean isValidAmount(String amountStr) {
    if (amountStr == null || amountStr.trim().isEmpty()) {
        return false;
    }

    try {
        double amount = Double.parseDouble(amountStr.trim());
        return Double.isFinite(amount) && amount > 0.0;
    } catch (NumberFormatException exception) {
        return false;
    }
}`,
        testInstruction: "Use the existing starter tests testValidAmounts() and testInvalidAmounts() in DataValidatorTest.java. No test replacement, new method-specific test, or additional import is required.",
        testMethods: [],
        testReference: "Existing starter tests: testValidAmounts and testInvalidAmounts.",
        testSnippet: "",
        shortDescription: "validates positive finite numeric amounts",
        changelog: "- isValidAmount(): validates positive finite numeric amounts -- Mohammad",
        commitSubject: "Validate positive amounts",
        commitBody: "Implement null-safe positive numeric amount validation and retain the existing shared DataValidator tests.",
      },
    },
    3: {
      "Daniel Kostandy": {
        member: "Daniel", className: "CurrencyConverter", method: "convert", branch: "feature/convert",
        productionInstruction: "Replace convert(double amount, String fromCurrency, String toCurrency) in CurrencyConverter.java.",
        productionSnippet: `public double convert(double amount, String fromCurrency, String toCurrency) {
    return amount * getExchangeRate(fromCurrency, toCurrency);
}`,
        testInstruction: "Replace the four listed placeholder methods in CurrencyConverterTest.java. The snippet uses the existing JUnit 5 @Test import and fully qualified assertions.",
        testMethods: ["testConvertUSDToEUR", "testConvertSameCurrency", "testConvertZeroAmount", "testConvertAllCurrencyPairs"],
        testSnippet: `@Test
public void testConvertUSDToEUR() {
    CurrencyConverter converter = new CurrencyConverter();
    org.junit.jupiter.api.Assertions.assertEquals(
            85.0, converter.convert(100.0, "USD", "EUR"), 0.000001);
}

@Test
public void testConvertSameCurrency() {
    CurrencyConverter converter = new CurrencyConverter();
    org.junit.jupiter.api.Assertions.assertEquals(
            42.5, converter.convert(42.5, "AUD", "AUD"), 0.000001);
}

@Test
public void testConvertZeroAmount() {
    CurrencyConverter converter = new CurrencyConverter();
    org.junit.jupiter.api.Assertions.assertEquals(
            0.0, converter.convert(0.0, "GBP", "EUR"), 0.000001);
}

@Test
public void testConvertAllCurrencyPairs() {
    CurrencyConverter converter = new CurrencyConverter();
    String[] currencies = {"USD", "EUR", "GBP", "AUD"};
    double[] usdRates = {1.0, 0.85, 0.75, 1.30};

    for (int fromIndex = 0; fromIndex < currencies.length; fromIndex++) {
        for (int toIndex = 0; toIndex < currencies.length; toIndex++) {
            double expected = 100.0 * usdRates[toIndex] / usdRates[fromIndex];
            org.junit.jupiter.api.Assertions.assertEquals(expected,
                    converter.convert(100.0, currencies[fromIndex], currencies[toIndex]),
                    0.000001,
                    currencies[fromIndex] + " -> " + currencies[toIndex]);
        }
    }
}`,
        shortDescription: "converts amounts using derived exchange rates",
        changelog: "- convert(): converts an amount between two currencies -- Daniel Kostandy",
        commitSubject: "Implement currency conversion",
        commitBody: "Implement convert using unrounded derived exchange rates and replace the four conversion test methods.",
      },
      "Raj Shah": {
        member: "Raj", className: "UserInterface", method: "start", branch: "feature/start",
        productionInstruction: "Replace start() in UserInterface.java.",
        productionSnippet: `public void start() {
    boolean running = true;
    while (running) {
        System.out.println("=== Currency Converter ===");
        showMenu();
        System.out.print("Enter choice: ");
        String choice = scanner.nextLine();

        switch (choice) {
            case "1" -> handleConversion();
            case "2" -> showExchangeRates();
            case "3" -> {
                System.out.println("Goodbye.");
                running = false;
            }
            default -> System.out.println("Invalid choice. Enter 1, 2 or 3.");
        }
    }
}`,
        testInstruction: "Replace testStartMethod() in UserInterfaceTest.java. System.in is replaced before UserInterface construction and both System.in/System.out are restored. No additional imports are required.",
        testMethods: ["testStartMethod"],
        testSnippet: `@Test
public void testStartMethod() {
    java.io.InputStream originalIn = System.in;
    java.io.PrintStream originalOut = System.out;
    java.io.ByteArrayInputStream input = new java.io.ByteArrayInputStream(
            "invalid\\n2\\n1\\nabc\\n3\\n".getBytes(java.nio.charset.StandardCharsets.UTF_8));
    java.io.ByteArrayOutputStream output = new java.io.ByteArrayOutputStream();

    try {
        System.setIn(input);
        System.setOut(new java.io.PrintStream(output));
        UserInterface ui = new UserInterface();
        ui.start();
    } finally {
        System.setIn(originalIn);
        System.setOut(originalOut);
    }

    String text = output.toString();
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("=== Currency Converter ==="));
    org.junit.jupiter.api.Assertions.assertTrue(text.contains(
            "1. Convert Currency" + System.lineSeparator()
            + "2. View Exchange Rates" + System.lineSeparator()
            + "3. Exit" + System.lineSeparator()
            + "Enter choice: "));
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("Invalid choice. Enter 1, 2 or 3."));
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("Exchange Rates (base = 1 unit)"));
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("Invalid amount. Enter a positive number."));
    org.junit.jupiter.api.Assertions.assertTrue(text.endsWith("Goodbye." + System.lineSeparator()));
}`,
        shortDescription: "runs the menu loop until the user exits",
        changelog: "- start(): runs the menu loop until the user exits -- Raj Shah",
        commitSubject: "Implement application menu loop",
        commitBody: "Implement start with menu dispatch, invalid-choice handling, and exit behaviour and replace its controlled-input test.",
      },
      "Tiya Agrawal": { member: "Tiya", className: null, method: null, branch: null },
      "Natasha Sutanto": { member: "Natasha", className: null, method: null, branch: null },
      Mohammad: { member: "Mohammad", className: null, method: null, branch: null },
    },
  },
};

const WORKFLOW_VALIDATION = {
  "CurrencyConverter.roundToTwoDecimals": {
    tests: ["CurrencyConverterTest.testRoundToTwoDecimals"],
    dependencies: [],
    mandatoryReleaseRound: 1,
  },
  "UserInterface.showExchangeRates": {
    tests: ["UserInterfaceTest.testShowExchangeRates"],
    dependencies: [
      { method: "CurrencyConverter.roundToTwoDecimals", round: 1 },
      { method: "CurrencyConverter.getSupportedCurrencies", round: 2 },
      { method: "CurrencyConverter.getExchangeRate", round: 2 },
    ],
    mandatoryReleaseRound: 2,
  },
  "UserInterface.handleConversion": {
    tests: [
      "UserInterfaceTest.testHandleConversion",
      "UserInterfaceTest.testHandleConversionRejectsInvalidAmount",
      "UserInterfaceTest.testHandleConversionRejectsInvalidSourceCurrency",
      "UserInterfaceTest.testHandleConversionRejectsInvalidTargetCurrency",
    ],
    dependencies: [
      { method: "DataValidator.normalizeCurrency", round: 1 },
      { method: "DataValidator.parseAmount", round: 1 },
      { method: "CurrencyConverter.roundToTwoDecimals", round: 1 },
      { method: "DataValidator.isValidCurrency", round: 2 },
      { method: "DataValidator.isValidAmount", round: 2 },
      { method: "CurrencyConverter.convert", round: 3 },
    ],
    mandatoryReleaseRound: 3,
  },
  "DataValidator.normalizeCurrency": {
    tests: ["DataValidatorTest.testNormalizeCurrency"],
    dependencies: [],
    mandatoryReleaseRound: 1,
  },
  "DataValidator.parseAmount": {
    tests: ["DataValidatorTest.testParseAmount"],
    dependencies: [],
    mandatoryReleaseRound: 1,
  },
  "CurrencyConverter.getExchangeRate": {
    tests: ["CurrencyConverterTest.testGetExchangeRate"],
    dependencies: [],
    mandatoryReleaseRound: 2,
  },
  "UserInterface.showMenu": {
    tests: ["UserInterfaceTest.testShowMenu"],
    dependencies: [],
    mandatoryReleaseRound: 2,
  },
  "CurrencyConverter.getSupportedCurrencies": {
    tests: ["CurrencyConverterTest.testGetSupportedCurrencies"],
    dependencies: [],
    mandatoryReleaseRound: 2,
  },
  "DataValidator.isValidCurrency": {
    tests: [
      "DataValidatorTest.testValidCurrencies",
      "DataValidatorTest.testInvalidCurrencies",
      "DataValidatorTest.testCaseInsensitiveCurrency",
    ],
    dependencies: [{ method: "DataValidator.normalizeCurrency", round: 1 }],
    mandatoryReleaseRound: 2,
  },
  "DataValidator.isValidAmount": {
    tests: [
      "DataValidatorTest.testValidAmounts",
      "DataValidatorTest.testInvalidAmounts",
    ],
    dependencies: [],
    mandatoryReleaseRound: 2,
  },
  "CurrencyConverter.convert": {
    tests: [
      "CurrencyConverterTest.testConvertUSDToEUR",
      "CurrencyConverterTest.testConvertSameCurrency",
      "CurrencyConverterTest.testConvertZeroAmount",
      "CurrencyConverterTest.testConvertAllCurrencyPairs",
    ],
    dependencies: [{ method: "CurrencyConverter.getExchangeRate", round: 2 }],
    mandatoryReleaseRound: 3,
  },
  "UserInterface.start": {
    tests: ["UserInterfaceTest.testStartMethod"],
    dependencies: [
      { method: "UserInterface.showMenu", round: 2 },
      { method: "UserInterface.handleConversion", round: 1 },
      { method: "UserInterface.showExchangeRates", round: 1 },
    ],
    mandatoryReleaseRound: 3,
  },
};

function cleanUnikey(value) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function validUnikey(unikey) {
  return /^[a-z]{4}\d{4}$/.test(unikey);
}

function updateResolvedTargets() {
  const targets = resolveRepositoryTargets(unikeyInput.value);
  resolvedTeamRepo.textContent = targets.teamRepoName;
  resolvedPersonalRepo.textContent = targets.personalRepoName;
  resolvedGitEmail.textContent = targets.gitEmail;
  repoName.textContent = targets.personalRepoName;
  emailInput.value = targets.isTestMode
    ? targets.gitEmail
    : (cleanUnikey(unikeyInput.value) ? targets.gitEmail : "");
  testModeBanner.classList.toggle("hidden", !targets.isTestMode);
  resolvedTargets.classList.toggle("test-mode-active", targets.isTestMode);
  integrationLocationLabel.textContent = `Run from ${targets.imFolderName}`;
  releaseLocationLabel.textContent = `${targets.teamRepoName} master`;
  syncLocationLabel.textContent = `Run from ${targets.personalFolderName}`;
}

unikeyInput.addEventListener("input", () => {
  const clean = cleanUnikey(unikeyInput.value);

  if (unikeyInput.value !== clean) {
    unikeyInput.value = clean;
  }

  if (!clean) {
    unikeyError.textContent = "";

    updateResolvedTargets();

    renderAssignment();

    return;
  }

  if (!validUnikey(clean)) {
    unikeyError.textContent =
      "UniKey must be exactly 4 letters followed by 4 digits.";
  } else {
    unikeyError.textContent = "";
  }

  updateResolvedTargets();
  renderAssignment();
});

testModeToggle.addEventListener("change", () => {
  updateResolvedTargets();
  outputSection.classList.add("hidden");
  commandOutput.textContent = "";
  renderAssignment();
});

function bashCommands(name, targets, operatingSystem) {
  const personalRepo = targets.personalRepoName;
  const teamUrl = targets.teamRepoUrl;
  const personalUrl = targets.personalRepoUrl;
  const email = targets.gitEmail;
  const imFolder = targets.imFolderName;
  const java17Check = operatingSystem === "mac"
    ? `java17_home=""
if [ "$setup_ready" = true ] && [ -x /usr/libexec/java_home ]; then
  java17_home=$(/usr/libexec/java_home -v 17 2>/dev/null) || java17_home=""
fi

if [ "$setup_ready" = true ] && { [ -z "$java17_home" ] || [ ! -x "$java17_home/bin/javac" ] || ! "$java17_home/bin/javac" -version 2>&1 | grep -Eq '^javac 17([.[:space:]]|$)'; }; then
  echo "Java 17 REQUIRED but not found."
  echo "STOP: This assignment requires JDK 17 because build.gradle requests Java 17."
  echo "Newer Java versions such as Java 21 or 23 do not replace this requirement, but they may remain installed."
  echo "Install with: brew install openjdk@17"
  echo "If macOS does not discover it, register it with:"
  echo "sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk"
  setup_ready=false
fi`
    : `java17_home=""

check_jdk_17() {
  candidate="$1"
  if [ -x "$candidate/bin/javac" ] && "$candidate/bin/javac" -version 2>&1 | grep -Eq '^javac 17([.[:space:]]|$)'; then
    java17_home="$candidate"
    return 0
  fi
  return 1
}

if [ "$setup_ready" = true ] && [ -n "$JAVA_HOME" ]; then
  check_jdk_17 "$JAVA_HOME" || true
fi

if [ "$setup_ready" = true ] && [ -z "$java17_home" ] && command -v javac >/dev/null 2>&1; then
  javac_path=$(readlink -f "$(command -v javac)" 2>/dev/null || command -v javac)
  javac_home=$(dirname "$(dirname "$javac_path")")
  check_jdk_17 "$javac_home" || true
fi

if [ "$setup_ready" = true ] && [ -z "$java17_home" ]; then
  for candidate in /usr/lib/jvm/* /usr/java/* /opt/jdk* /opt/java*; do
    [ -d "$candidate" ] || continue
    if check_jdk_17 "$candidate"; then
      break
    fi
  done
fi

if [ "$setup_ready" = true ] && [ -z "$java17_home" ]; then
  echo "Java 17 REQUIRED but not found."
  echo "STOP: This assignment requires JDK 17 because build.gradle requests Java 17."
  echo "Newer Java versions do not replace this requirement, but they may remain installed."
  echo "Install a JDK 17 package using your distribution's package manager (for example OpenJDK 17), then ensure its JDK directory is discoverable through JAVA_HOME or the standard JVM directories."
  setup_ready=false
fi`;

  return `setup_ready=true

echo "Checking Git..."

if ! command -v git >/dev/null 2>&1; then
  echo "ERROR: Git is not installed."
  setup_ready=false
else
  echo "Git found."
fi

echo ""
echo "Checking Java 17..."

${java17Check}

if [ "$setup_ready" = true ]; then
  echo "Java 17 JDK found: $java17_home"
fi

echo ""
echo "Checking Gradle..."

if [ "$setup_ready" = true ] && ! command -v gradle >/dev/null 2>&1; then
  echo "Gradle REQUIRED but not found."
  echo "STOP: Install Gradle and ensure the gradle command is available before continuing."
  setup_ready=false
fi

if [ "$setup_ready" = true ]; then
  echo "Gradle found."
fi

echo ""
echo "Checking access to the team repository..."

if [ "$setup_ready" = true ] && ! git ls-remote "${teamUrl}" >/dev/null 2>&1; then
  echo "ERROR: Cannot access the team repository."
  echo "Check your USYD GitHub Enterprise SSH access."
  setup_ready=false
fi

if [ "$setup_ready" = true ]; then
  echo "Team repository reachable."
fi

echo ""
echo "Checking your personal repository..."

if [ "$setup_ready" = true ] && ! git ls-remote "${personalUrl}" >/dev/null 2>&1; then
  echo "ERROR: Cannot access your personal repository:"
  echo "${personalRepo}"
  echo ""
  echo "Make sure:"
  echo "1. You created it on GitHub Enterprise."
  echo "2. The name is exactly ${personalRepo}"
  echo "3. It is inside ${REPOSITORY_CONFIG.organization}"
  echo "4. Your SSH access works."
  setup_ready=false
fi

if [ "$setup_ready" = true ]; then
  echo "Personal repository reachable."
fi

echo ""
echo "Checking local folders..."

if [ "$setup_ready" = true ] && [ -e "${personalRepo}" ]; then
  echo "ERROR: ${personalRepo} already exists in this folder."
  setup_ready=false
fi

if [ "$setup_ready" = true ] && [ -e "${imFolder}" ]; then
  echo "ERROR: ${imFolder} already exists in this folder."
  setup_ready=false
fi

if [ "$setup_ready" = true ]; then
  echo "Local folders are clear."

  echo ""
  echo "All checks passed."

echo ""
echo "Creating personal working repository..."

git clone "${teamUrl}" "${personalRepo}"

cd "${personalRepo}"

git remote rename origin upstream

git remote add origin "${personalUrl}"

git config --local user.name "${name}"
git config --local user.email "${email}"

git push -u origin master --tags

echo ""
echo "Personal repository configured."

cd ..

echo ""
echo "Creating Integration Manager clone..."

git clone "${teamUrl}" "${imFolder}"

cd "${imFolder}"

git remote add me "${personalUrl}"

git config --local user.name "${name}"
git config --local user.email "${email}"

echo ""
echo "Integration Manager repository configured."

cd "../${personalRepo}"

git fetch upstream
git merge --no-edit upstream/master

echo ""
echo "=================================="
echo "PERSONAL REPOSITORY"
echo "=================================="

echo ""
echo "Remotes:"
git remote -v

echo ""
echo "Git identity:"
git config --local user.name
git config --local user.email

echo ""
echo "Status:"
git status

echo ""
echo "=================================="
echo "INTEGRATION MANAGER REPOSITORY"
echo "=================================="

cd "../${imFolder}"

echo ""
echo "Remotes:"
git remote -v

echo ""
echo "Git identity:"
git config --local user.name
git config --local user.email

echo ""
echo "Status:"
git status

echo ""
echo "=================================="
echo "SETUP COMPLETE"
echo "=================================="

echo ""
echo "Your coding folder:"
echo "${personalRepo}"

echo ""
echo "Your integration folder:"
echo "${imFolder}"

cd ..

echo ""
echo "Current working folder:"
pwd

echo ""
echo "READY FOR STEP 02"
else
  echo ""
  echo "STOP: Setup checks failed. No repositories were cloned or configured."
fi`;
}

function powershellCommands(name, targets) {
  const personalRepo = targets.personalRepoName;
  const teamUrl = targets.teamRepoUrl;
  const personalUrl = targets.personalRepoUrl;
  const email = targets.gitEmail;
  const imFolder = targets.imFolderName;

  return `$ErrorActionPreference = "Continue"
$setupReady = $true

Write-Host "Checking Git..."

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Git is not installed."
    $setupReady = $false
} else {
    Write-Host "Git found."
}

Write-Host ""
Write-Host "Checking Java 17..."

$java17Home = $null
$jdkCandidates = @()

if ($env:JAVA_HOME) {
    $jdkCandidates += $env:JAVA_HOME
}

$javacCommands = @(Get-Command javac -All -ErrorAction SilentlyContinue)
foreach ($javacCommand in $javacCommands) {
    if ($javacCommand.Source) {
        $jdkCandidates += (Split-Path (Split-Path $javacCommand.Source -Parent) -Parent)
    }
}

$jdkSearchRoots = @(
    (Join-Path $env:ProgramFiles "Java"),
    (Join-Path $env:ProgramFiles "Eclipse Adoptium"),
    (Join-Path $env:ProgramFiles "Microsoft")
)

foreach ($searchRoot in $jdkSearchRoots) {
    if (Test-Path $searchRoot) {
        $jdkCandidates += @(Get-ChildItem $searchRoot -Directory -ErrorAction SilentlyContinue | ForEach-Object { $_.FullName })
    }
}

foreach ($candidate in ($jdkCandidates | Select-Object -Unique)) {
    $candidateJavac = Join-Path $candidate "bin\\javac.exe"
    if (Test-Path $candidateJavac) {
        $javacVersion = (& $candidateJavac -version 2>&1 | Out-String).Trim()
        if ($LASTEXITCODE -eq 0 -and $javacVersion -match '^javac 17(?:\.|\s|$)') {
            $java17Home = $candidate
            break
        }
    }
}

if (-not $java17Home) {
    Write-Host "Java 17 REQUIRED but not found."
    Write-Host "STOP: This assignment requires JDK 17 because build.gradle requests Java 17."
    Write-Host "Newer Java versions such as Java 21 or 23 do not replace this requirement, but they may remain installed."
    Write-Host "Install a JDK 17 distribution, then make it discoverable through JAVA_HOME, PATH, or a standard Program Files JDK directory."
    $setupReady = $false
} else {
    Write-Host "Java 17 JDK found: $java17Home"
}

Write-Host ""
Write-Host "Checking Gradle..."

if ($setupReady -and -not (Get-Command gradle -ErrorAction SilentlyContinue)) {
    Write-Host "Gradle REQUIRED but not found."
    Write-Host "STOP: Install Gradle and ensure the gradle command is available before continuing."
    $setupReady = $false
}

if ($setupReady) {
    Write-Host "Gradle found."
}

Write-Host ""
Write-Host "Checking access to the team repository..."

if ($setupReady) {
    git ls-remote "${teamUrl}" *> $null
}

if ($setupReady -and $LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Cannot access the team repository."
    Write-Host "Check your USYD GitHub Enterprise SSH access."
    $setupReady = $false
}

if ($setupReady) {
    Write-Host "Team repository reachable."
}

Write-Host ""
Write-Host "Checking your personal repository..."

if ($setupReady) {
    git ls-remote "${personalUrl}" *> $null
}

if ($setupReady -and $LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Cannot access your personal repository:"
    Write-Host "${personalRepo}"

    Write-Host ""
    Write-Host "Make sure:"
    Write-Host "1. You created it on GitHub Enterprise."
    Write-Host "2. The name is exactly ${personalRepo}"
    Write-Host "3. It is inside ${REPOSITORY_CONFIG.organization}"
    Write-Host "4. Your SSH access works."

    $setupReady = $false
}

if ($setupReady) {
    Write-Host "Personal repository reachable."
}

Write-Host ""
Write-Host "Checking local folders..."

if ($setupReady -and (Test-Path "${personalRepo}")) {
    Write-Host "ERROR: ${personalRepo} already exists in this folder."
    $setupReady = $false
}

if ($setupReady -and (Test-Path "${imFolder}")) {
    Write-Host "ERROR: ${imFolder} already exists in this folder."
    $setupReady = $false
}

if ($setupReady) {
    Write-Host "Local folders are clear."

    Write-Host ""
    Write-Host "All checks passed."

Write-Host ""
Write-Host "Creating personal working repository..."

git clone "${teamUrl}" "${personalRepo}"

Set-Location "${personalRepo}"

git remote rename origin upstream

git remote add origin "${personalUrl}"

git config --local user.name "${name}"
git config --local user.email "${email}"

git push -u origin master --tags

Write-Host ""
Write-Host "Personal repository configured."

Set-Location ..

Write-Host ""
Write-Host "Creating Integration Manager clone..."

git clone "${teamUrl}" "${imFolder}"

Set-Location "${imFolder}"

git remote add me "${personalUrl}"

git config --local user.name "${name}"
git config --local user.email "${email}"

Write-Host ""
Write-Host "Integration Manager repository configured."

Set-Location "../${personalRepo}"

git fetch upstream
git merge --no-edit upstream/master

Write-Host ""
Write-Host "=================================="
Write-Host "PERSONAL REPOSITORY"
Write-Host "=================================="

Write-Host ""
Write-Host "Remotes:"
git remote -v

Write-Host ""
Write-Host "Git identity:"
git config --local user.name
git config --local user.email

Write-Host ""
Write-Host "Status:"
git status

Write-Host ""
Write-Host "=================================="
Write-Host "INTEGRATION MANAGER REPOSITORY"
Write-Host "=================================="

Set-Location "../${imFolder}"

Write-Host ""
Write-Host "Remotes:"
git remote -v

Write-Host ""
Write-Host "Git identity:"
git config --local user.name
git config --local user.email

Write-Host ""
Write-Host "Status:"
git status

Write-Host ""
Write-Host "=================================="
Write-Host "SETUP COMPLETE"
Write-Host "=================================="

Write-Host ""
Write-Host "Your coding folder:"
Write-Host "${personalRepo}"

Write-Host ""
Write-Host "Your integration folder:"
Write-Host "${imFolder}"

Set-Location ..

Write-Host ""
Write-Host "Current working folder:"
Write-Host (Get-Location).Path

Write-Host ""
Write-Host "READY FOR STEP 02"
} else {
    Write-Host ""
    Write-Host "STOP: Setup checks failed. No repositories were cloned or configured."
}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {

  const studentSelected = document.querySelector(
    'input[name="studentName"]:checked',
  );

  const osSelected = document.querySelector('input[name="os"]:checked');

  if (!studentSelected) {
    alert("Select your name.");
    return;
  }

  const name = studentSelected.value;

  const unikey = cleanUnikey(unikeyInput.value);

  if (!validUnikey(unikey)) {
    unikeyError.textContent =
      "UniKey must be exactly 4 letters followed by 4 digits.";

    unikeyInput.focus();

    return;
  }

  if (!osSelected) {
    alert("Select your computer operating system.");

    return;
  }

  const os = osSelected.value;
  const targets = resolveRepositoryTargets(unikey);

  let commands;

  if (os === "windows") {
    commands = powershellCommands(name, targets);

    terminalType.textContent = "Windows · PowerShell";
  } else {
    commands = bashCommands(name, targets, os);

    terminalType.textContent =
      os === "mac" ? "macOS · Terminal" : "Linux · Terminal";
  }

  commandOutput.textContent = commands;

  outputSection.classList.remove("hidden");

  outputSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  } catch (error) {
    console.error("Unable to generate setup commands:", error);
    outputSection.classList.add("hidden");
    alert(
      "The setup commands could not be generated. Check the browser console for details.",
    );
  }
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(commandOutput.textContent);

    copyButton.textContent = "Copied ✓";

    setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1500);
  } catch {
    alert("Couldn't copy automatically. Select the commands manually.");
  }
});

function selectMember(memberName) {
  selectedMember = memberName;
  selectedMemberLabel.textContent = memberName;

  memberButtons.forEach((button) => {
    const isSelected = button.dataset.member === memberName;
    button.classList.toggle("active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  studentRadios.forEach((radio) => {
    radio.checked = radio.value === memberName;
  });

  updateRoundContext();
  renderAssignment();
}

function updateRoundContext() {
  roundContext.textContent = selectedMember
    ? `${selectedMember} · Follow each step in order.`
    : "Select a member to begin this round.";
}

function setFeatureStepsDisabled(disabled) {
  featureWorkflowSteps.forEach((step) => {
    step.classList.toggle("step-disabled", disabled);
    step.setAttribute("aria-disabled", String(disabled));

    if (disabled) {
      step.open = false;
    }
  });
}

function humanizeMethod(methodName) {
  return methodName
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase();
}

function selectedOperatingSystem() {
  return document.querySelector('input[name="os"]:checked')?.value || "mac";
}

function bashRepositoryStep({ folder, repositoryLabel, remotes, body, successVariable, nextStep, readyMessage = "" }) {
  const remoteChecks = Object.entries(remotes).map(([name, url]) => `
if [ "$step_verified" = true ]; then
  ${name}_url=$(git remote get-url ${name} 2>/dev/null) || step_verified=false
  if [ "$step_verified" = true ] && [ "$${name}_url" != "${url}" ]; then
    echo "STOP: ${name} does not match the expected ${repositoryLabel} URL."
    step_verified=false
  fi
fi`).join("");

  return `step_verified=true
member_root=$(pwd -P)
expected_repo="$member_root/${folder}"

if [ ! -d "$expected_repo/.git" ]; then
  echo "STOP: Expected ${repositoryLabel} ${folder} was not found in the current member root."
  echo "No Git commands were run."
  step_verified=false
elif ! cd "$expected_repo"; then
  echo "STOP: Could not enter ${folder}."
  step_verified=false
fi

if [ "$step_verified" = true ]; then
  git_root=$(git rev-parse --show-toplevel 2>/dev/null) || step_verified=false
fi
if [ "$step_verified" = true ]; then
  actual_root=$(cd "$git_root" && pwd -P) || step_verified=false
  if [ "$step_verified" = true ] && { [ "$actual_root" != "$expected_repo" ] || [ "$(basename "$actual_root")" != "${folder}" ]; }; then
    echo "STOP: The current Git repository is not the expected ${folder} repository."
    step_verified=false
  fi
fi
${remoteChecks}

if [ "$step_verified" = true ]; then
${body}
fi

if ! cd "$member_root"; then
  echo "STOP: Could not return to the member root: $member_root"
else
  echo ""
  echo "Current working folder:"
  pwd
  if [ "$step_verified" = true ] && [ "${successVariable}" = true ]; then
    echo "=================================="
    echo "STEP COMPLETE"
    echo "=================================="
    echo "${readyMessage || `READY FOR STEP ${nextStep}`}"
  fi
fi`;
}

function powershellRepositoryStep({ folder, repositoryLabel, remotes, body, successVariable, nextStep, readyMessage = "" }) {
  const remoteChecks = Object.entries(remotes).map(([name, url]) => `
if ($stepVerified) {
  $${name}Url = git remote get-url ${name} 2>$null
  if ($LASTEXITCODE -ne 0 -or $${name}Url.Trim() -ne "${url}") {
    Write-Host "STOP: ${name} does not match the expected ${repositoryLabel} URL."
    $stepVerified = $false
  }
}`).join("");

  return `$stepVerified = $true
$memberRoot = (Get-Location).Path
$expectedRepo = Join-Path $memberRoot "${folder}"

if (-not (Test-Path (Join-Path $expectedRepo ".git"))) {
  Write-Host "STOP: Expected ${repositoryLabel} ${folder} was not found in the current member root."
  Write-Host "No Git commands were run."
  $stepVerified = $false
} else {
  Set-Location $expectedRepo
}

if ($stepVerified) {
  $gitRoot = git rev-parse --show-toplevel 2>$null
  if ($LASTEXITCODE -ne 0) { $stepVerified = $false }
}
if ($stepVerified) {
  $actualRoot = (Resolve-Path $gitRoot.Trim()).Path
  if ($actualRoot -ne $expectedRepo -or (Split-Path -Leaf $actualRoot) -ne "${folder}") {
    Write-Host "STOP: The current Git repository is not the expected ${folder} repository."
    $stepVerified = $false
  }
}
${remoteChecks}

if ($stepVerified) {
${body}
}

Set-Location $memberRoot
Write-Host ""
Write-Host "Current working folder:"
Write-Host (Get-Location).Path
if ($stepVerified -and ${successVariable}) {
  Write-Host "=================================="
  Write-Host "STEP COMPLETE"
  Write-Host "=================================="
  Write-Host "${readyMessage || `READY FOR STEP ${nextStep}`}"
}`;
}

function assignmentValidationKey(assignment) {
  return `${assignment.className}.${assignment.method}`;
}

function validationForAssignment(assignment) {
  return WORKFLOW_VALIDATION[assignmentValidationKey(assignment)];
}

function gradleSpecificTestsCommand(testSelectors) {
  return `gradle test ${testSelectors.map((selector) => `--tests ${selector}`).join(" ")}`;
}

function releaseValidationEntries(roundNumber) {
  const entries = [];

  for (let assignmentRoundNumber = 1; assignmentRoundNumber <= roundNumber; assignmentRoundNumber += 1) {
    Object.values(ASSIGNMENT_DATA.rounds[assignmentRoundNumber]).forEach((assignment) => {
      if (!assignment.method) {
        return;
      }

      const validation = validationForAssignment(assignment);
      entries.push({
        assignment,
        assignedRound: assignmentRoundNumber,
        validation,
      });
    });
  }

  return entries;
}

function renderReleaseGuidance() {
  const targets = resolveRepositoryTargets(unikeyInput.value);
  const releaseVersion = ASSIGNMENT_DATA.releaseVersions[currentRound];
  const buildVersion = releaseVersion.slice(1);
  const previousReleaseVersion = currentRound === 1
    ? ASSIGNMENT_DATA.releaseVersions.starter
    : ASSIGNMENT_DATA.releaseVersions[currentRound - 1];
  const previousBuildVersion = previousReleaseVersion.slice(1);
  const previousVersionPattern = previousBuildVersion.replaceAll(".", "\\.");
  const buildVersionPattern = buildVersion.replaceAll(".", "\\.");
  const usesPowerShell = selectedOperatingSystem() === "windows";
  const validationEntries = releaseValidationEntries(currentRound);
  const mandatoryEntries = validationEntries.filter(
    ({ validation }) => validation.mandatoryReleaseRound <= currentRound,
  );
  const maturedDeferredEntries = mandatoryEntries.filter(
    ({ assignedRound, validation }) => assignedRound < currentRound && validation.mandatoryReleaseRound === currentRound,
  );
  const otherMandatoryEntries = mandatoryEntries.filter(
    (entry) => !maturedDeferredEntries.includes(entry),
  );
  const carriedEntries = validationEntries.filter(
    ({ validation }) => validation.mandatoryReleaseRound > currentRound,
  );
  const maturedDeferredTests = maturedDeferredEntries.flatMap(({ validation }) => validation.tests);
  const otherMandatoryTests = otherMandatoryEntries.flatMap(({ validation }) => validation.tests);
  const releaseTestCommands = [];

  if (maturedDeferredTests.length) {
    releaseTestCommands.push(gradleSpecificTestsCommand(maturedDeferredTests));
  }

  if (otherMandatoryTests.length) {
    releaseTestCommands.push(gradleSpecificTestsCommand(otherMandatoryTests));
  }

  if (currentRound === 3) {
    releaseTestCommands.push("gradle test");
  }

  const carriedDescription = carriedEntries.length
    ? carriedEntries
      .map(({ assignment, validation }) => `${assignment.method} → Round ${validation.mandatoryReleaseRound}`)
      .join(", ")
    : "none";

  releaseVersionNote.textContent =
    `Configured Round ${currentRound} release: ${releaseVersion}. ` +
    `After mandatory validation succeeds, the command safely updates build.gradle from ${previousBuildVersion} to ${buildVersion}. ` +
    `Tests whose dependencies remain unavailable are carried forward (${carriedDescription}). ` +
    `All tests mandatory by Round ${currentRound} must pass before release. ` +
    `The starter version is ${ASSIGNMENT_DATA.releaseVersions.starter}.`;

  if (usesPowerShell) {
    const guardedReleaseTests = releaseTestCommands.map((command) =>
      `if ($releaseReady) { ${command} }\nif ($releaseReady -and $LASTEXITCODE -ne 0) { $releaseReady = $false }`,
    ).join("\n");

    releaseCommands.textContent = `$releaseReady = $true
git checkout master
if ($LASTEXITCODE -ne 0) {
  Write-Host "STOP: Could not check out team master. Release validation was not run."
  $releaseReady = $false
}
if ($releaseReady) {
  git fetch origin
  if ($LASTEXITCODE -ne 0) {
    Write-Host "STOP: Could not fetch the latest team master from origin. Release validation was not run."
    $releaseReady = $false
  }
}
if ($releaseReady) {
  git merge --no-edit origin/master
  if ($LASTEXITCODE -ne 0) {
    Write-Host "STOP: Could not merge origin/master. Resolve the IM repository manually; release-time conflicts are never resolved automatically."
    $releaseReady = $false
  }
}
if ($releaseReady) {
  $releaseBranch = (git branch --show-current).Trim()
  $releaseUnresolved = @(git diff --name-only --diff-filter=U)
  $releaseStatus = @(git status --porcelain)
  $releaseHead = (git rev-parse HEAD).Trim()
  $remoteMasterHead = (git rev-parse origin/master).Trim()
  if ($releaseBranch -ne "master") {
    Write-Host "STOP: Step 08 must release from master."
    $releaseReady = $false
  } elseif ($releaseUnresolved.Count -ne 0) {
    Write-Host "STOP: Unresolved merge files remain. Release validation was not run."
    $releaseUnresolved | ForEach-Object { Write-Host $_ }
    $releaseReady = $false
  } elseif ($releaseStatus.Count -ne 0) {
    Write-Host "STOP: The Integration Manager working tree is not clean after updating master."
    $releaseStatus | ForEach-Object { Write-Host $_ }
    $releaseReady = $false
  } elseif ($releaseHead -ne $remoteMasterHead) {
    Write-Host "STOP: Local HEAD does not equal the freshly fetched origin/master. Release validation was not run."
    $releaseReady = $false
  }
}
if ($releaseReady) { git status }
if ($releaseReady -and $LASTEXITCODE -ne 0) { $releaseReady = $false }
if ($releaseReady) {
  git rev-parse -q --verify "refs/tags/${releaseVersion}" *> $null
  if ($LASTEXITCODE -eq 0) {
    Write-Host "STOP: Tag ${releaseVersion} already exists locally. This round may already be released."
    $releaseReady = $false
  }
}
if ($releaseReady) {
  git ls-remote --exit-code --tags origin "refs/tags/${releaseVersion}" *> $null
  $remoteTagStatus = $LASTEXITCODE
  if ($remoteTagStatus -eq 0) {
    Write-Host "STOP: Tag ${releaseVersion} already exists on origin. This round is already released."
    $releaseReady = $false
  } elseif ($remoteTagStatus -ne 2) {
    Write-Host "STOP: Could not verify whether tag ${releaseVersion} exists on origin. No release was performed."
    $releaseReady = $false
  }
}
if ($releaseReady) { gradle classes }
if ($releaseReady -and $LASTEXITCODE -ne 0) { $releaseReady = $false }
if ($releaseReady) { gradle testClasses }
if ($releaseReady -and $LASTEXITCODE -ne 0) { $releaseReady = $false }
${guardedReleaseTests}

if ($releaseReady) {
  $buildFile = Get-Content -Raw "build.gradle"
  $oldMatches = [regex]::Matches($buildFile, "(?m)^\\s*version\\s*=\\s*'${previousVersionPattern}'\\s*$")
  $newMatches = [regex]::Matches($buildFile, "(?m)^\\s*version\\s*=\\s*'${buildVersionPattern}'\\s*$")
  if ($newMatches.Count -gt 0) {
    Write-Host "STOP: build.gradle is already version ${buildVersion}, but tag ${releaseVersion} does not exist. Review the release state; no empty release commit will be created."
    $releaseReady = $false
  } elseif ($oldMatches.Count -ne 1) {
    Write-Host "STOP: Expected exactly one build.gradle version line containing ${previousBuildVersion}. No file was changed."
    $releaseReady = $false
  } else {
    $updatedBuildFile = [regex]::Replace($buildFile, "(?m)^\\s*version\\s*=\\s*'${previousVersionPattern}'\\s*$", "version = '${buildVersion}'")
    [IO.File]::WriteAllText((Resolve-Path "build.gradle"), $updatedBuildFile, (New-Object Text.UTF8Encoding($false)))
    $verifiedBuildFile = Get-Content -Raw "build.gradle"
    if ([regex]::Matches($verifiedBuildFile, "(?m)^\\s*version\\s*=\\s*'${buildVersionPattern}'\\s*$").Count -ne 1 -or
        [regex]::Matches($verifiedBuildFile, "(?m)^\\s*version\\s*=\\s*'${previousVersionPattern}'\\s*$").Count -ne 0) {
      Write-Host "STOP: Could not verify the build.gradle version update to ${buildVersion}."
      $releaseReady = $false
    }
  }
}
if ($releaseReady) { git add build.gradle }
if ($releaseReady -and $LASTEXITCODE -ne 0) { $releaseReady = $false }
if ($releaseReady) { git commit -m "Release ${releaseVersion}" -m "Update the project version for the Round ${currentRound} release." }
if ($releaseReady -and $LASTEXITCODE -ne 0) { $releaseReady = $false }
if ($releaseReady) { git tag -a ${releaseVersion} -m "Round ${currentRound} release ${releaseVersion}" }
if ($releaseReady -and $LASTEXITCODE -ne 0) { $releaseReady = $false }
if ($releaseReady) { git push origin master }
if ($releaseReady -and $LASTEXITCODE -ne 0) { $releaseReady = $false }
if ($releaseReady) { git push origin ${releaseVersion} }
if ($releaseReady -and $LASTEXITCODE -ne 0) { $releaseReady = $false }
if (-not $releaseReady) {
  Write-Host "STOP: Round ${currentRound} release did not complete. Review the messages above; no further release commands were run."
}`;
  } else {
    const guardedBashReleaseTests = releaseTestCommands.map((command) =>
      `if [ "$release_ready" = true ] && ! ${command}; then\n  echo "STOP: A mandatory Round ${currentRound} test failed."\n  release_ready=false\nfi`,
    ).join("\n");

    releaseCommands.textContent = `release_ready=true
if ! git checkout master; then
  echo "STOP: Could not check out team master. Release validation was not run."
  release_ready=false
fi
if [ "$release_ready" = true ] && ! git fetch origin; then
  echo "STOP: Could not fetch the latest team master from origin. Release validation was not run."
  release_ready=false
fi
if [ "$release_ready" = true ] && ! git merge --no-edit origin/master; then
  echo "STOP: Could not merge origin/master. Resolve the IM repository manually; release-time conflicts are never resolved automatically."
  release_ready=false
fi
if [ "$release_ready" = true ]; then
  release_branch=$(git branch --show-current) || release_ready=false
  release_unresolved=$(git diff --name-only --diff-filter=U) || release_ready=false
  release_status=$(git status --porcelain) || release_ready=false
  release_head=$(git rev-parse HEAD) || release_ready=false
  remote_master_head=$(git rev-parse origin/master) || release_ready=false
fi
if [ "$release_ready" = true ] && [ "$release_branch" != "master" ]; then
  echo "STOP: Step 08 must release from master."
  release_ready=false
fi
if [ "$release_ready" = true ] && [ -n "$release_unresolved" ]; then
  echo "STOP: Unresolved merge files remain. Release validation was not run."
  printf '%s\n' "$release_unresolved"
  release_ready=false
fi
if [ "$release_ready" = true ] && [ -n "$release_status" ]; then
  echo "STOP: The Integration Manager working tree is not clean after updating master."
  printf '%s\n' "$release_status"
  release_ready=false
fi
if [ "$release_ready" = true ] && [ "$release_head" != "$remote_master_head" ]; then
  echo "STOP: Local HEAD does not equal the freshly fetched origin/master. Release validation was not run."
  release_ready=false
fi
if [ "$release_ready" = true ]; then git status || release_ready=false; fi
if [ "$release_ready" = true ] && git rev-parse -q --verify "refs/tags/${releaseVersion}" >/dev/null 2>&1; then
  echo "STOP: Tag ${releaseVersion} already exists locally. This round may already be released."
  release_ready=false
fi
if [ "$release_ready" = true ]; then
  git ls-remote --exit-code --tags origin "refs/tags/${releaseVersion}" >/dev/null 2>&1
  remote_tag_status=$?
  if [ "$remote_tag_status" -eq 0 ]; then
    echo "STOP: Tag ${releaseVersion} already exists on origin. This round is already released."
    release_ready=false
  elif [ "$remote_tag_status" -ne 2 ]; then
    echo "STOP: Could not verify whether tag ${releaseVersion} exists on origin. No release was performed."
    release_ready=false
  fi
fi
if [ "$release_ready" = true ]; then gradle classes || release_ready=false; fi
if [ "$release_ready" = true ]; then gradle testClasses || release_ready=false; fi
${guardedBashReleaseTests}

if [ "$release_ready" = true ]; then
  old_version_count=$(grep -Ec "^[[:space:]]*version[[:space:]]*=[[:space:]]*'${previousVersionPattern}'[[:space:]]*$" build.gradle)
  new_version_count=$(grep -Ec "^[[:space:]]*version[[:space:]]*=[[:space:]]*'${buildVersionPattern}'[[:space:]]*$" build.gradle)
  if [ "$new_version_count" -gt 0 ]; then
    echo "STOP: build.gradle is already version ${buildVersion}, but tag ${releaseVersion} does not exist. Review the release state; no empty release commit will be created."
    release_ready=false
  elif [ "$old_version_count" -ne 1 ]; then
    echo "STOP: Expected exactly one build.gradle version line containing ${previousBuildVersion}. No file was changed."
    release_ready=false
  fi
fi
if [ "$release_ready" = true ]; then
  old_version_line=$(grep -E "^[[:space:]]*version[[:space:]]*=[[:space:]]*'${previousVersionPattern}'[[:space:]]*$" build.gradle)
  version_tmp="build.gradle.release-${releaseVersion}.tmp"
  if ! awk -v old_line="$old_version_line" -v new_line="version = '${buildVersion}'" '{ if ($0 == old_line) print new_line; else print }' build.gradle > "$version_tmp"; then
    echo "STOP: Could not prepare the build.gradle version update."
    release_ready=false
  elif ! mv "$version_tmp" build.gradle; then
    echo "STOP: Could not replace build.gradle with the updated file."
    release_ready=false
  fi
fi
if [ "$release_ready" = true ]; then
  verified_new_count=$(grep -Ec "^[[:space:]]*version[[:space:]]*=[[:space:]]*'${buildVersionPattern}'[[:space:]]*$" build.gradle)
  verified_old_count=$(grep -Ec "^[[:space:]]*version[[:space:]]*=[[:space:]]*'${previousVersionPattern}'[[:space:]]*$" build.gradle)
  if [ "$verified_new_count" -ne 1 ] || [ "$verified_old_count" -ne 0 ]; then
    echo "STOP: Could not verify the build.gradle version update to ${buildVersion}."
    release_ready=false
  fi
fi
if [ "$release_ready" = true ]; then git add build.gradle || release_ready=false; fi
if [ "$release_ready" = true ]; then git commit -m "Release ${releaseVersion}" -m "Update the project version for the Round ${currentRound} release." || release_ready=false; fi
if [ "$release_ready" = true ]; then git tag -a ${releaseVersion} -m "Round ${currentRound} release ${releaseVersion}" || release_ready=false; fi
if [ "$release_ready" = true ]; then git push origin master || release_ready=false; fi
if [ "$release_ready" = true ]; then git push origin ${releaseVersion} || release_ready=false; fi
if [ "$release_ready" != true ]; then
  echo "STOP: Round ${currentRound} release did not complete. Review the messages above; no further release commands were run."
fi`;
  }

  releaseCommands.textContent = usesPowerShell
    ? powershellRepositoryStep({
      folder: targets.imFolderName,
      repositoryLabel: "Integration Manager repository",
      remotes: { origin: targets.teamRepoUrl, me: targets.personalRepoUrl },
      body: releaseCommands.textContent,
      successVariable: "$releaseReady",
      nextStep: "09",
    })
    : bashRepositoryStep({
      folder: targets.imFolderName,
      repositoryLabel: "Integration Manager repository",
      remotes: { origin: targets.teamRepoUrl, me: targets.personalRepoUrl },
      body: releaseCommands.textContent,
      successVariable: "$release_ready",
      nextStep: "09",
    });

  const syncBody = usesPowerShell
    ? `$syncReady = $true
git checkout master
if ($LASTEXITCODE -ne 0) { $syncReady = $false }
if ($syncReady) { git fetch upstream }
if ($syncReady -and $LASTEXITCODE -ne 0) { $syncReady = $false }
if ($syncReady) { git merge --no-edit upstream/master }
if ($syncReady -and $LASTEXITCODE -ne 0) { $syncReady = $false }
if ($syncReady) { git push origin master --tags }
if ($syncReady -and $LASTEXITCODE -ne 0) { $syncReady = $false }
if (-not $syncReady) { Write-Host "STOP: Personal repository sync did not complete." }`
    : `sync_ready=true
if ! git checkout master; then sync_ready=false; fi
if [ "$sync_ready" = true ] && ! git fetch upstream; then sync_ready=false; fi
if [ "$sync_ready" = true ] && ! git merge --no-edit upstream/master; then sync_ready=false; fi
if [ "$sync_ready" = true ] && ! git push origin master --tags; then sync_ready=false; fi
if [ "$sync_ready" != true ]; then echo "STOP: Personal repository sync did not complete."; fi`;

  syncCommands.textContent = usesPowerShell
    ? powershellRepositoryStep({
      folder: targets.personalFolderName,
      repositoryLabel: "personal repository",
      remotes: { origin: targets.personalRepoUrl, upstream: targets.teamRepoUrl },
      body: syncBody,
      successVariable: "$syncReady",
      nextStep: "02 OF THE NEXT ROUND",
    })
    : bashRepositoryStep({
      folder: targets.personalFolderName,
      repositoryLabel: "personal repository",
      remotes: { origin: targets.personalRepoUrl, upstream: targets.teamRepoUrl },
      body: syncBody,
      successVariable: "$sync_ready",
      nextStep: "02 OF THE NEXT ROUND",
    });

  releaseLocationLabel.textContent = `${targets.teamRepoName} master`;
  syncLocationLabel.textContent = `Start from member root; enter ${targets.personalFolderName} automatically`;
}

function finalisationMemberData() {
  const modeKey = testModeToggle.checked ? "test" : "production";
  return TEAM_MEMBERS.map((member) => ({
    ...member,
    unikey: cleanUnikey(member.unikeys[modeKey] || ""),
  }));
}

function finalisationOwner() {
  return TEAM_MEMBERS.find((member) => member.roles.includes(FINALISATION_CONFIG.responsibleRole));
}

function allocatedMethodsFor(memberName) {
  const methods = [];
  Object.values(ASSIGNMENT_DATA.rounds).forEach((round) => {
    const assignment = round[memberName];
    if (assignment?.method) {
      methods.push(`${assignment.className}.${assignment.method}`);
    }
  });
  return methods;
}

function buildFinalReadme(members, teamRepoUrl) {
  const tableRows = members.map((member) =>
    `| ${member.name} | ${member.unikey} | ${allocatedMethodsFor(member.name).join(", ")} |`,
  ).join("\n");
  const contributionBlocks = members.map((member) => `------------
name: ${member.name}
unikey: ${member.unikey}
What I did:
${member.contribution}
------------`).join("\n\n");

  return `# Currency Converter

## Team

| Member | Unikey | Methods implemented |
| --- | --- | --- |
${tableRows}

Integration-manager repository: ${teamRepoUrl}

## Quick Start

\`\`\`bash
gradle build      # compile and run the tests
gradle run        # run the application
gradle test       # run the tests and write the coverage report
\`\`\`

Coverage report: \`build/reports/jacoco/test/html/index.html\`

The independent Makefile uses the repository's standalone JUnit console jar:

\`\`\`bash
make compile
make test
make clean
\`\`\`

## How the work was divided

Each member implemented the methods listed in the team table. Features were developed on individual feature branches and integrated into team master one member at a time.

## What I personally implemented

${contributionBlocks}`;
}

function renderFinalisationGuidance() {
  const owner = finalisationOwner();
  const isOwner = selectedMember === owner?.name;
  const members = finalisationMemberData();
  const missingMembers = members.filter((member) => !validUnikey(member.unikey));
  const ownerData = members.find((member) => member.name === owner?.name);
  const isAvailable = isOwner && currentRound === 3 && missingMembers.length === 0;

  finalisationStep.classList.toggle("step-disabled", !isAvailable);
  finalisationStep.setAttribute("aria-disabled", String(!isAvailable));
  finalisationContent.classList.toggle("hidden", !isAvailable);
  finalReleaseStep.classList.toggle("step-disabled", !isAvailable);
  finalReleaseStep.setAttribute("aria-disabled", String(!isAvailable));
  finalReleaseContent.classList.toggle("hidden", !isAvailable);

  if (!isAvailable) {
    finalisationCommands.textContent = "";
    finalReleaseCommands.textContent = "";
    if (!isOwner) {
      finalisationMessage.textContent = `${owner?.name || "The configured finalisation owner"} performs the shared finalisation. Wait for the final v1.0.0 release, then complete the final personal sync.`;
    } else if (currentRound !== 3) {
      finalisationMessage.textContent = "Step 10 is available to the configured finalisation owner after the Round 3 release and personal sync.";
    } else {
      finalisationMessage.textContent = missingMembers
        .map((member) => `STOP: Missing configured unikey for ${member.name}.`)
        .join(" ");
    }
    finalReleaseMessage.textContent = finalisationMessage.textContent;
    return;
  }

  const targets = resolveRepositoryTargets(ownerData.unikey);
  const finalReadme = buildFinalReadme(members, targets.teamRepoUrl);
  finalisationMessage.textContent =
    `${owner.name} only: copy the single command below and run it from the member root containing ${targets.personalFolderName} and ${targets.imFolderName}. It writes README.md and Makefile automatically only after its safety checks pass.`;
  finalReleaseMessage.textContent = `${owner.name} only: after Step 10 is pushed successfully, run the single command below to validate, commit version 1.0.0, create annotated tag v1.0.0, and publish the final release.`;

  const coverageClasses = FINALISATION_CONFIG.coverageClasses.join(",");
  const historicalCoverage = targets.isTestMode
    ? REPOSITORY_CONFIG.test.historicalCoverageMissedLines
    : null;
  const coverageDecisionPython = historicalCoverage
    ? `complete = set(results) == set(required)
all_zero = complete and all(results[name][0] == 0 for name in required)
historical_missed = ${JSON.stringify(historicalCoverage)}
actual_missed = {name: results[name][0] for name in required} if complete else {}
if all_zero:
    sys.exit(0)
if complete and actual_missed == historical_missed:
    print("TEST MODE ONLY: accepting the known pre-fix dummy coverage baseline.")
    print("Fresh workflows still require and generate genuine 100% coverage.")
    sys.exit(0)
sys.exit(1)`
    : `complete = set(results) == set(required)
all_zero = complete and all(results[name][0] == 0 for name in required)
sys.exit(0 if all_zero else 1)`;
const bashBody = `finalise_ready=true
finalisation_succeeded=false
finalisation_committed=false
generated_files=false

expected_personal_repo="$member_root/${targets.personalFolderName}"
if [ ! -d "$expected_personal_repo/.git" ]; then
  echo "STOP: This is not the configured ${owner.name} member workspace. Expected ${targets.personalFolderName} beside ${targets.imFolderName}."
  finalise_ready=false
fi
if [ "$finalise_ready" = true ]; then
  personal_origin=$(git -C "$expected_personal_repo" remote get-url origin 2>/dev/null) || finalise_ready=false
  if [ "$finalise_ready" = true ] && [ "$personal_origin" != "${targets.personalRepoUrl}" ]; then
    echo "STOP: The personal repository beside this IM clone does not match the configured finalisation owner."
    finalise_ready=false
  fi
fi
if [ "$finalise_ready" = true ] && { ! git diff --quiet || ! git diff --cached --quiet; }; then
  echo "STOP: The Integration Manager repository has tracked changes. Step 10 requires a clean repository."
  finalise_ready=false
fi
if [ "$finalise_ready" = true ]; then
  untracked_files=$(git ls-files --others --exclude-standard)
  if [ -n "$untracked_files" ]; then
    echo "STOP: The Integration Manager repository has unexpected untracked files:"
    echo "Untracked files:"
    printf '%s\n' "$untracked_files"
    finalise_ready=false
  fi
fi
if [ "$finalise_ready" = true ] && ! git checkout master; then finalise_ready=false; fi
if [ "$finalise_ready" = true ] && ! git fetch origin; then finalise_ready=false; fi
if [ "$finalise_ready" = true ]; then
  finalisation_baseline=$(git rev-parse origin/master) || finalise_ready=false
  current_branch=$(git branch --show-current) || finalise_ready=false
  unresolved=$(git diff --name-only --diff-filter=U) || finalise_ready=false
  clean_status=$(git status --porcelain) || finalise_ready=false
  current_head=$(git rev-parse HEAD) || finalise_ready=false
  latest_tag=$(git describe --tags --abbrev=0 2>/dev/null) || finalise_ready=false
  version_count=$(grep -Ec "^[[:space:]]*version[[:space:]]*=[[:space:]]*'${FINALISATION_CONFIG.existingBuildVersion}'[[:space:]]*$" build.gradle) || true
fi
if [ "$finalise_ready" = true ] && { [ "$current_branch" != master ] || [ -n "$unresolved" ] || [ -n "$clean_status" ] || [ "$current_head" != "$finalisation_baseline" ]; }; then
  echo "STOP: Team master is not clean, resolved, and equal to origin/master."
  finalise_ready=false
fi
if [ "$finalise_ready" = true ] && [ "$latest_tag" != "${FINALISATION_CONFIG.existingReleaseTag}" ]; then
  echo "STOP: Latest existing release tag must be ${FINALISATION_CONFIG.existingReleaseTag}."
  finalise_ready=false
fi
if [ "$finalise_ready" = true ] && [ "$version_count" -ne 1 ]; then
  echo "STOP: build.gradle must contain exactly one version = '${FINALISATION_CONFIG.existingBuildVersion}' line."
  finalise_ready=false
fi

if [ "$finalise_ready" = true ]; then
  cat > README.md <<'STEP10_README_EOF'
${finalReadme}
STEP10_README_EOF
  cat > Makefile <<'STEP10_MAKEFILE_EOF'
${FINAL_MAKEFILE}
STEP10_MAKEFILE_EOF
  generated_files=true
fi

if [ "$finalise_ready" = true ]; then
  tracked_changes=$(git diff --name-only HEAD)
  untracked_files=$(git ls-files --others --exclude-standard)
  if [ "$tracked_changes" != "README.md" ] || [ "$untracked_files" != "Makefile" ]; then
    echo "STOP: Generated files do not have the expected tracked/untracked state."
    echo "Tracked changes:"
    printf '%s\n' "$tracked_changes"
    echo "Untracked files:"
    printf '%s\n' "$untracked_files"
    finalise_ready=false
  fi
fi
if [ "$finalise_ready" = true ]; then
  for required_readme_text in "# Currency Converter" "## Team" "## Quick Start" "## How the work was divided" "## What I personally implemented" ${members.map((member) => `"${member.name}" "${member.unikey}"`).join(" ")} "${targets.teamRepoUrl}"; do
    if ! grep -Fq -- "$required_readme_text" README.md; then
      echo "STOP: README.md is missing required text: $required_readme_text"
      finalise_ready=false
    fi
  done
  if grep -Eiq 'TODO|PLACEHOLDER' README.md; then echo "STOP: README.md still contains starter placeholder text."; finalise_ready=false; fi
  if ! grep -Fq '${FINALISATION_CONFIG.junitJar}' Makefile ||
      ! grep -Eq '^compile:' Makefile || ! grep -Eq '^test:' Makefile || ! grep -Eq '^clean:' Makefile ||
      grep -Eiq 'gradle|gradlew' Makefile; then
    echo "STOP: Makefile does not match the required independent JUnit build structure."
    finalise_ready=false
  fi
fi
if [ "$finalise_ready" = true ] && ! git diff --check; then finalise_ready=false; fi

if [ "$finalise_ready" = true ] && ! make clean; then echo "STOP: make clean failed."; finalise_ready=false; fi
if [ "$finalise_ready" = true ] && ! make compile; then echo "STOP: make compile failed."; finalise_ready=false; fi
if [ "$finalise_ready" = true ]; then
  if ! python3 - <<'PY'
${MAKE_INCREMENTAL_VALIDATION_PYTHON}
PY
  then echo "STOP: Makefile incremental dependency validation failed."; finalise_ready=false; fi
fi
if [ "$finalise_ready" = true ] && ! make test; then echo "STOP: make test failed."; finalise_ready=false; fi
if [ "$finalise_ready" = true ] && ! gradle clean; then echo "STOP: gradle clean failed."; finalise_ready=false; fi
if [ "$finalise_ready" = true ] && ! gradle classes; then echo "STOP: gradle classes failed."; finalise_ready=false; fi
if [ "$finalise_ready" = true ] && ! gradle testClasses; then echo "STOP: gradle testClasses failed."; finalise_ready=false; fi
if [ "$finalise_ready" = true ] && ! gradle test; then echo "STOP: gradle test failed."; finalise_ready=false; fi
if [ "$finalise_ready" = true ] && ! gradle jacocoTestReport; then echo "STOP: JaCoCo report generation failed."; finalise_ready=false; fi
if [ "$finalise_ready" = true ] && [ ! -f build/reports/jacoco/test/jacocoTestReport.xml ]; then
  echo "STOP: JaCoCo XML report was not found at build/reports/jacoco/test/jacocoTestReport.xml."
  finalise_ready=false
fi
if [ "$finalise_ready" = true ]; then
  if ! COVERAGE_CLASSES="${coverageClasses}" python3 - <<'PY'
import os
import sys
import xml.etree.ElementTree as ET

root = ET.parse("build/reports/jacoco/test/jacocoTestReport.xml").getroot()
required = os.environ["COVERAGE_CLASSES"].split(",")
results = {}
for class_node in root.findall(".//class"):
    simple_name = class_node.get("name", "").split("/")[-1]
    if simple_name in required:
        counter = class_node.find("./counter[@type='LINE']")
        if counter is not None:
            results[simple_name] = (int(counter.get("missed", "0")), int(counter.get("covered", "0")))

print("COVERAGE:")
failed = False
for name in required:
    if name not in results:
        print(f"{name}: MISSING from JaCoCo XML")
        failed = True
        continue
    missed, covered = results[name]
    total = missed + covered
    percent = 100.0 if total == 0 else covered * 100.0 / total
    print(f"{name}: {percent:.0f}% (missed={missed}, covered={covered})")
    failed = failed or missed != 0

missed = sum(value[0] for value in results.values())
covered = sum(value[1] for value in results.values())
total = missed + covered
overall = 100.0 if total == 0 else covered * 100.0 / total
print(f"Overall line coverage: {overall:.0f}%")
${coverageDecisionPython}
PY
  then
    echo "STOP: Production LINE coverage is not 100%."
    finalise_ready=false
  fi
fi
if [ "$finalise_ready" = true ] && ! gradle build; then echo "STOP: gradle build failed."; finalise_ready=false; fi
if [ "$finalise_ready" = true ]; then
  run_output=$(printf '3\\n' | gradle run --console=plain) || finalise_ready=false
  if [ "$finalise_ready" = true ] && { ! printf '%s' "$run_output" | grep -Fq "=== Currency Converter ===" || ! printf '%s' "$run_output" | grep -Fq "Enter choice:" || ! printf '%s' "$run_output" | grep -Fq "Goodbye."; }; then
    echo "STOP: gradle run did not launch the required interactive application."
    finalise_ready=false
  fi
fi

if [ "$finalise_ready" = true ] && ! git diff --check; then finalise_ready=false; fi
if [ "$finalise_ready" = true ] && ! git fetch origin; then finalise_ready=false; fi
if [ "$finalise_ready" = true ]; then
  current_team_master=$(git rev-parse origin/master) || finalise_ready=false
  if [ "$finalise_ready" = true ] && [ "$current_team_master" != "$finalisation_baseline" ]; then
    echo "STOP: Team master changed during finalisation. Restart Step 10 from the latest team master."
    finalise_ready=false
  fi
fi
if [ "$finalise_ready" = true ]; then
  tracked_changes=$(git diff --name-only HEAD)
  staged_changes=$(git diff --cached --name-only)
  untracked_files=$(git ls-files --others --exclude-standard)
  unresolved=$(git diff --name-only --diff-filter=U)
  current_branch=$(git branch --show-current)
  current_head=$(git rev-parse HEAD)
  if [ "$tracked_changes" != "README.md" ] || [ -n "$staged_changes" ] || [ "$untracked_files" != "Makefile" ] ||
      [ -n "$unresolved" ] || [ "$current_branch" != master ] || [ "$current_head" != "$finalisation_baseline" ]; then
    echo "STOP: Repository state changed during final validation. Finalisation was not committed or pushed."
    finalise_ready=false
  fi
fi
if [ "$finalise_ready" = true ]; then git add README.md Makefile || finalise_ready=false; fi
if [ "$finalise_ready" = true ]; then
  git commit -m "Finalise assignment documentation and build" -m "Complete the team README and independent Makefile before the final release." || finalise_ready=false
fi
if [ "$finalise_ready" = true ]; then
  finalisation_committed=true
  finalisation_commit=$(git rev-parse HEAD) || finalise_ready=false
  committed_files=$(git diff-tree --no-commit-id --name-only -r HEAD | sort) || finalise_ready=false
  expected_committed_files=$(printf '%s\n' Makefile README.md | sort)
  if [ "$finalise_ready" = true ] && [ "$committed_files" != "$expected_committed_files" ]; then
    echo "STOP: The finalisation commit contains unexpected files. Team master was not pushed."
    finalise_ready=false
  fi
fi
if [ "$finalise_ready" = true ]; then
  git status
  if git push origin master; then finalisation_succeeded=true; else finalise_ready=false; fi
fi
if [ "$finalise_ready" != true ] && [ "$generated_files" = true ] && [ "$finalisation_committed" != true ]; then
  cleanup_head=$(git rev-parse HEAD 2>/dev/null || true)
  unexpected_tracked=$(git diff --name-only HEAD | grep -Ev '^(README\.md|Makefile)$' || true)
  unexpected_staged=$(git diff --cached --name-only | grep -Ev '^(README\.md|Makefile)$' || true)
  unexpected_untracked=$(git ls-files --others --exclude-standard | grep -Ev '^Makefile$' || true)
  if [ "$cleanup_head" = "$finalisation_baseline" ] && [ -z "$unexpected_tracked" ] &&
      [ -z "$unexpected_staged" ] && [ -z "$unexpected_untracked" ]; then
    git restore --staged -- README.md >/dev/null 2>&1 || true
    if git ls-files --error-unmatch Makefile >/dev/null 2>&1; then
      git restore --staged -- Makefile >/dev/null 2>&1 || true
    fi
    git restore -- README.md
    rm -f Makefile
    echo "Step 10 generated files were removed; the repository was restored to the recorded baseline."
  else
    echo "STOP: Repository state changed unexpectedly. Generated files were not cleaned automatically. Review the repository manually."
  fi
fi
if [ "$finalise_ready" != true ]; then
  echo "STOP: Finalisation did not complete. No final release or tag was created."
fi`;

const powershellBody = `$finaliseReady = $true
$finalisationSucceeded = $false
$finalisationCommitted = $false
$generatedFiles = $false
$expectedPersonalRepo = Join-Path $memberRoot "${targets.personalFolderName}"
if (-not (Test-Path (Join-Path $expectedPersonalRepo ".git") -PathType Container)) {
  Write-Host "STOP: This is not the configured ${owner.name} member workspace. Expected ${targets.personalFolderName} beside ${targets.imFolderName}."
  $finaliseReady = $false
}
if ($finaliseReady) {
  $personalOrigin = (git -C $expectedPersonalRepo remote get-url origin 2>$null).Trim()
  if ($LASTEXITCODE -ne 0 -or $personalOrigin -ne "${targets.personalRepoUrl}") {
    Write-Host "STOP: The personal repository beside this IM clone does not match the configured finalisation owner."
    $finaliseReady = $false
  }
}
$stagedChanges = @()
$trackedChanges = @()
$untrackedFiles = @()
if ($finaliseReady) {
  $stagedChanges = @(git diff --cached --name-only)
  $trackedChanges = @(git diff --name-only HEAD | Sort-Object)
  $untrackedFiles = @(git ls-files --others --exclude-standard | Sort-Object)
  if ($stagedChanges.Count -ne 0 -or $trackedChanges.Count -ne 0 -or $untrackedFiles.Count -ne 0) {
    Write-Host "STOP: Step 10 requires a clean Integration Manager repository."
    Write-Host "Tracked changes:"; $trackedChanges
    Write-Host "Untracked files:"; $untrackedFiles
    $finaliseReady = $false
  }
}
if ($finaliseReady) { git checkout master }
if ($finaliseReady -and $LASTEXITCODE -ne 0) { $finaliseReady = $false }
if ($finaliseReady) { git fetch origin }
if ($finaliseReady -and $LASTEXITCODE -ne 0) { $finaliseReady = $false }
if ($finaliseReady) {
  $finalisationBaseline = (git rev-parse origin/master).Trim()
  $cleanStatus = @(git status --porcelain)
  $unresolved = @(git diff --name-only --diff-filter=U)
  $currentBranch = (git branch --show-current).Trim()
  $currentHead = (git rev-parse HEAD).Trim()
  $latestTag = (git describe --tags --abbrev=0).Trim()
  $versionCount = ([regex]::Matches((Get-Content -Raw build.gradle), "(?m)^\\s*version\\s*=\\s*'${FINALISATION_CONFIG.existingBuildVersion.replaceAll(".", "\\.")}'\\s*$")).Count
  if ($cleanStatus.Count -ne 0 -or $unresolved.Count -ne 0 -or $currentBranch -ne "master" -or $currentHead -ne $finalisationBaseline -or $latestTag -ne "${FINALISATION_CONFIG.existingReleaseTag}" -or $versionCount -ne 1) {
    Write-Host "STOP: Team master, tag, or build version is not ready for finalisation."
    $finaliseReady = $false
  }
}
if ($finaliseReady) {
  $readmeContent = @'
${finalReadme}
'@
  $makefileContent = @'
${FINAL_MAKEFILE}
'@
  $utf8NoBom = New-Object Text.UTF8Encoding($false)
  [IO.File]::WriteAllText((Join-Path (Get-Location) "README.md"), $readmeContent + [Environment]::NewLine, $utf8NoBom)
  [IO.File]::WriteAllText((Join-Path (Get-Location) "Makefile"), $makefileContent + [Environment]::NewLine, $utf8NoBom)
  $generatedFiles = $true
}
if ($finaliseReady) {
  $trackedChanges = @(git diff --name-only HEAD)
  $untrackedFiles = @(git ls-files --others --exclude-standard)
  if ($trackedChanges.Count -ne 1 -or $trackedChanges[0] -ne "README.md" -or $untrackedFiles.Count -ne 1 -or $untrackedFiles[0] -ne "Makefile") { Write-Host "STOP: Generated files do not have the expected tracked/untracked state."; $finaliseReady = $false }
  $requiredReadmeText = @("# Currency Converter", "## Team", "## Quick Start", "## How the work was divided", "## What I personally implemented", ${members.flatMap((member) => [`"${member.name}"`, `"${member.unikey}"`]).join(", ")}, "${targets.teamRepoUrl}")
  foreach ($text in $requiredReadmeText) { if (-not (Select-String -Path README.md -SimpleMatch $text -Quiet)) { Write-Host "STOP: README.md is missing required text: $text"; $finaliseReady = $false } }
  if (Select-String -Path README.md -Pattern 'TODO|PLACEHOLDER' -Quiet) { Write-Host "STOP: README.md still contains starter placeholder text."; $finaliseReady = $false }
  $makefileText = Get-Content -Raw Makefile
  if (-not $makefileText.Contains("${FINALISATION_CONFIG.junitJar}") -or $makefileText -notmatch '(?m)^compile:' -or $makefileText -notmatch '(?m)^test:' -or $makefileText -notmatch '(?m)^clean:' -or $makefileText -match '(?i)gradle|gradlew') { Write-Host "STOP: Makefile does not match the required independent JUnit build structure."; $finaliseReady = $false }
}
if ($finaliseReady) { git diff --check }
if ($finaliseReady -and $LASTEXITCODE -ne 0) { $finaliseReady = $false }
foreach ($command in @("make clean", "make compile")) {
  if ($finaliseReady) { Invoke-Expression $command; if ($LASTEXITCODE -ne 0) { Write-Host "STOP: $command failed."; $finaliseReady = $false } }
}
if ($finaliseReady) {
  $makeValidation = @'
${MAKE_INCREMENTAL_VALIDATION_PYTHON}
'@
  $makeValidation | python3 -
  if ($LASTEXITCODE -ne 0) { Write-Host "STOP: Makefile incremental dependency validation failed."; $finaliseReady = $false }
}
foreach ($command in @("make test", "gradle clean", "gradle classes", "gradle testClasses", "gradle test", "gradle jacocoTestReport")) {
  if ($finaliseReady) { Invoke-Expression $command; if ($LASTEXITCODE -ne 0) { Write-Host "STOP: $command failed."; $finaliseReady = $false } }
}
if ($finaliseReady -and (-not (Test-Path "build/reports/jacoco/test/jacocoTestReport.xml"))) { Write-Host "STOP: JaCoCo XML report was not found."; $finaliseReady = $false }
if ($finaliseReady) {
  $coverageScript = @'
import sys, xml.etree.ElementTree as ET
required = ["App", "CurrencyConverter", "DataValidator", "UserInterface"]
root = ET.parse("build/reports/jacoco/test/jacocoTestReport.xml").getroot()
results = {}
for node in root.findall(".//class"):
    name = node.get("name", "").split("/")[-1]
    if name in required:
        counter = node.find("./counter[@type='LINE']")
        if counter is not None:
            results[name] = (int(counter.get("missed", "0")), int(counter.get("covered", "0")))
print("COVERAGE:")
for name in required:
    missed, covered = results.get(name, (-1, 0))
    total = missed + covered
    percent = 0 if missed < 0 else (100 if total == 0 else covered * 100 / total)
    print(f"{name}: {percent:.0f}% (missed={missed}, covered={covered})")
missed = sum(value[0] for value in results.values())
covered = sum(value[1] for value in results.values())
total = missed + covered
print(f"Overall line coverage: {(100 if total == 0 else covered * 100 / total):.0f}%")
${coverageDecisionPython}
'@
  $coverageScript | python3 -
  if ($LASTEXITCODE -ne 0) { Write-Host "STOP: Production LINE coverage is not 100%."; $finaliseReady = $false }
}
if ($finaliseReady) { gradle build; if ($LASTEXITCODE -ne 0) { $finaliseReady = $false } }
if ($finaliseReady) {
  $runOutput = "3" | gradle run --console=plain | Out-String
  if ($LASTEXITCODE -ne 0 -or -not $runOutput.Contains("=== Currency Converter ===") -or -not $runOutput.Contains("Enter choice:") -or -not $runOutput.Contains("Goodbye.")) {
    Write-Host "STOP: gradle run did not launch the required interactive application."
    $finaliseReady = $false
  }
}
if ($finaliseReady) { git diff --check }
if ($finaliseReady -and $LASTEXITCODE -ne 0) { $finaliseReady = $false }
if ($finaliseReady) { git fetch origin }
if ($finaliseReady -and $LASTEXITCODE -ne 0) { $finaliseReady = $false }
if ($finaliseReady) {
  $currentTeamMaster = (git rev-parse origin/master).Trim()
  if ($currentTeamMaster -ne $finalisationBaseline) { Write-Host "STOP: Team master changed during finalisation. Restart Step 10 from the latest team master."; $finaliseReady = $false }
}
if ($finaliseReady) {
  $trackedChanges = @(git diff --name-only HEAD)
  $stagedChanges = @(git diff --cached --name-only)
  $untrackedFiles = @(git ls-files --others --exclude-standard)
  $unresolved = @(git diff --name-only --diff-filter=U)
  $currentBranch = (git branch --show-current).Trim()
  $currentHead = (git rev-parse HEAD).Trim()
  if ($trackedChanges.Count -ne 1 -or $trackedChanges[0] -ne "README.md" -or $stagedChanges.Count -ne 0 -or
      $untrackedFiles.Count -ne 1 -or $untrackedFiles[0] -ne "Makefile" -or $unresolved.Count -ne 0 -or
      $currentBranch -ne "master" -or $currentHead -ne $finalisationBaseline) {
    Write-Host "STOP: Repository state changed during final validation. Finalisation was not committed or pushed."
    $finaliseReady = $false
  }
}
if ($finaliseReady) { git add README.md Makefile }
if ($finaliseReady -and $LASTEXITCODE -ne 0) { $finaliseReady = $false }
if ($finaliseReady) { git commit -m "Finalise assignment documentation and build" -m "Complete the team README and independent Makefile before the final release." }
if ($finaliseReady -and $LASTEXITCODE -ne 0) { $finaliseReady = $false }
if ($finaliseReady) {
  $finalisationCommitted = $true
  $finalisationCommit = (git rev-parse HEAD).Trim()
  $committedFiles = @(git diff-tree --no-commit-id --name-only -r HEAD | Sort-Object)
  if ($committedFiles.Count -ne 2 -or $committedFiles[0] -ne "Makefile" -or $committedFiles[1] -ne "README.md") {
    Write-Host "STOP: The finalisation commit contains unexpected files. Team master was not pushed."
    $finaliseReady = $false
  }
}
if ($finaliseReady) { git status; git push origin master; if ($LASTEXITCODE -eq 0) { $finalisationSucceeded = $true } else { $finaliseReady = $false } }
if (-not $finaliseReady -and $generatedFiles -and -not $finalisationCommitted) {
  $cleanupHead = (git rev-parse HEAD 2>$null).Trim()
  $unexpectedTracked = @(git diff --name-only HEAD | Where-Object { $_ -notin @("README.md", "Makefile") })
  $unexpectedStaged = @(git diff --cached --name-only | Where-Object { $_ -notin @("README.md", "Makefile") })
  $unexpectedUntracked = @(git ls-files --others --exclude-standard | Where-Object { $_ -ne "Makefile" })
  if ($cleanupHead -eq $finalisationBaseline -and $unexpectedTracked.Count -eq 0 -and $unexpectedStaged.Count -eq 0 -and $unexpectedUntracked.Count -eq 0) {
    git restore --staged -- README.md 2>$null
    git ls-files --error-unmatch Makefile 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) { git restore --staged -- Makefile 2>$null }
    git restore -- README.md
    Remove-Item Makefile -Force -ErrorAction SilentlyContinue
    Write-Host "Step 10 generated files were removed; the repository was restored to the recorded baseline."
  } else {
    Write-Host "STOP: Repository state changed unexpectedly. Generated files were not cleaned automatically. Review the repository manually."
  }
}
if (-not $finaliseReady) { Write-Host "STOP: Finalisation did not complete. No final release or tag was created." }`;

  finalisationCommands.textContent = selectedOperatingSystem() === "windows"
    ? powershellRepositoryStep({
      folder: targets.imFolderName,
      repositoryLabel: "Integration Manager repository",
      remotes: { origin: targets.teamRepoUrl },
      body: powershellBody,
      successVariable: "$finalisationSucceeded",
      readyMessage: "READY FOR FINAL RELEASE",
    })
    : bashRepositoryStep({
      folder: targets.imFolderName,
      repositoryLabel: "Integration Manager repository",
      remotes: { origin: targets.teamRepoUrl },
      body: bashBody,
      successVariable: "$finalisation_succeeded",
      readyMessage: "READY FOR FINAL RELEASE",
    });

  const finalReleaseBashBody = `release_ready=true
release_succeeded=false
release_committed=false
release_tag_created=false
version_changed=false
expected_personal_repo="$member_root/${targets.personalFolderName}"

if [ ! -d "$expected_personal_repo/.git" ]; then echo "STOP: This is not the configured finalisation owner's member workspace."; release_ready=false; fi
if [ "$release_ready" = true ]; then
  personal_origin=$(git -C "$expected_personal_repo" remote get-url origin 2>/dev/null) || release_ready=false
  if [ "$release_ready" = true ] && [ "$personal_origin" != "${targets.personalRepoUrl}" ]; then echo "STOP: The sibling personal repository does not match the configured owner."; release_ready=false; fi
fi
if [ "$release_ready" = true ] && { ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; }; then echo "STOP: Step 11 requires a completely clean IM repository."; release_ready=false; fi
if [ "$release_ready" = true ] && [ "$(git branch --show-current)" != master ]; then echo "STOP: Step 11 must start with the IM repository already on master."; release_ready=false; fi
if [ "$release_ready" = true ] && ! git fetch origin; then release_ready=false; fi
if [ "$release_ready" = true ]; then
  release_baseline=$(git rev-parse HEAD) || release_ready=false
  origin_head=$(git rev-parse origin/master) || release_ready=false
  current_branch=$(git branch --show-current)
  head_subject=$(git log -1 --format=%s)
  head_files=$(git diff-tree --no-commit-id --name-only -r HEAD | sort)
  expected_head_files=$(printf '%s\n' Makefile README.md | sort)
  latest_tag=$(git describe --tags --abbrev=0 2>/dev/null || true)
  old_version_count=$(grep -Ec "^[[:space:]]*version[[:space:]]*=[[:space:]]*'0\\.4\\.0'[[:space:]]*$" build.gradle || true)
  if [ "$current_branch" != master ]; then echo "STOP: Step 11 must run on master."; release_ready=false; fi
  if [ "$release_baseline" != "$origin_head" ]; then echo "STOP: Local master must exactly equal origin/master."; release_ready=false; fi
  if [ "$head_subject" != "Finalise assignment documentation and build" ] || [ "$head_files" != "$expected_head_files" ]; then echo "STOP: HEAD is not the verified two-file Step 10 finalisation commit."; release_ready=false; fi
  if [ ! -f README.md ] || [ ! -f Makefile ]; then echo "STOP: README.md and Makefile must exist."; release_ready=false; fi
  if [ "$latest_tag" != "v0.4.0" ]; then echo "STOP: Latest existing release tag must be v0.4.0."; release_ready=false; fi
  if git rev-parse -q --verify refs/tags/v1.0.0 >/dev/null || git ls-remote --exit-code --tags origin refs/tags/v1.0.0 >/dev/null 2>&1; then echo "STOP: v1.0.0 already exists locally or on origin."; release_ready=false; fi
  if [ "$old_version_count" -ne 1 ]; then echo "STOP: build.gradle must contain exactly one active version 0.4.0 declaration."; release_ready=false; fi
fi

if [ "$release_ready" = true ]; then
  version_tmp="build.gradle.step11.tmp"
  awk '{ if ($0 ~ /^[[:space:]]*version[[:space:]]*=[[:space:]]*'"'"'0\\.4\\.0'"'"'[[:space:]]*$/) print "version = '"'"'1.0.0'"'"'"; else print }' build.gradle > "$version_tmp" && mv "$version_tmp" build.gradle || release_ready=false
  if [ "$release_ready" = true ]; then version_changed=true; fi
fi
if [ "$release_ready" = true ]; then
  new_count=$(grep -Ec "^[[:space:]]*version[[:space:]]*=[[:space:]]*'1\\.0\\.0'[[:space:]]*$" build.gradle || true)
  old_count=$(grep -Ec "^[[:space:]]*version[[:space:]]*=[[:space:]]*'0\\.4\\.0'[[:space:]]*$" build.gradle || true)
  tracked=$(git diff --name-only HEAD); staged=$(git diff --cached --name-only); untracked=$(git ls-files --others --exclude-standard)
  if [ "$new_count" -ne 1 ] || [ "$old_count" -ne 0 ] || [ "$tracked" != build.gradle ] || [ -n "$staged" ] || [ -n "$untracked" ]; then echo "STOP: Controlled build.gradle version update verification failed."; release_ready=false; fi
fi
if [ "$release_ready" = true ] && ! git diff --check; then release_ready=false; fi
if [ "$release_ready" = true ] && ! make clean; then echo "STOP: make clean failed."; release_ready=false; fi
if [ "$release_ready" = true ] && ! make compile; then echo "STOP: make compile failed."; release_ready=false; fi
if [ "$release_ready" = true ] && ! make test; then echo "STOP: make test failed."; release_ready=false; fi
if [ "$release_ready" = true ] && ! gradle clean; then echo "STOP: gradle clean failed."; release_ready=false; fi
if [ "$release_ready" = true ] && ! gradle classes; then echo "STOP: gradle classes failed."; release_ready=false; fi
if [ "$release_ready" = true ] && ! gradle testClasses; then echo "STOP: gradle testClasses failed."; release_ready=false; fi
if [ "$release_ready" = true ] && ! gradle test; then echo "STOP: gradle test failed."; release_ready=false; fi
if [ "$release_ready" = true ] && ! gradle jacocoTestReport; then echo "STOP: JaCoCo report generation failed."; release_ready=false; fi
if [ "$release_ready" = true ]; then
  if ! COVERAGE_CLASSES="${coverageClasses}" python3 - <<'PY'
import os, sys, xml.etree.ElementTree as ET
required = os.environ["COVERAGE_CLASSES"].split(",")
root = ET.parse("build/reports/jacoco/test/jacocoTestReport.xml").getroot()
results = {}
for node in root.findall(".//class"):
    name = node.get("name", "").split("/")[-1]
    if name in required:
        counter = node.find("./counter[@type='LINE']")
        if counter is not None: results[name] = (int(counter.get("missed", "0")), int(counter.get("covered", "0")))
print("COVERAGE:")
for name in required:
    missed, covered = results.get(name, (-1, 0)); total = missed + covered
    print(f"{name}: {(0 if missed < 0 else (100 if total == 0 else covered * 100 / total)):.0f}% (missed={missed}, covered={covered})")
missed = sum(v[0] for v in results.values()); covered = sum(v[1] for v in results.values()); total = missed + covered
print(f"Overall line coverage: {(100 if total == 0 else covered * 100 / total):.0f}%")
${coverageDecisionPython}
PY
  then echo "STOP: Production LINE coverage is not 100%."; release_ready=false; fi
fi
if [ "$release_ready" = true ] && ! gradle build; then echo "STOP: gradle build failed."; release_ready=false; fi
if [ "$release_ready" = true ] && ! git fetch origin; then release_ready=false; fi
if [ "$release_ready" = true ]; then
  current_origin=$(git rev-parse origin/master); current_head=$(git rev-parse HEAD); current_branch=$(git branch --show-current)
  tracked=$(git diff --name-only HEAD); staged=$(git diff --cached --name-only); untracked=$(git ls-files --others --exclude-standard)
  if [ "$current_origin" != "$release_baseline" ]; then echo "STOP: Team master changed during final release. Restart Step 11 from the latest team master."; release_ready=false; fi
  if [ "$current_head" != "$release_baseline" ] || [ "$current_branch" != master ] || [ "$tracked" != build.gradle ] || [ -n "$staged" ] || [ -n "$untracked" ]; then echo "STOP: Repository state changed during final release validation."; release_ready=false; fi
fi
if [ "$release_ready" = true ]; then git add build.gradle || release_ready=false; fi
if [ "$release_ready" = true ]; then git commit -m "Finalise version 1.0.0" -m "Set the project version for the final assignment release." || release_ready=false; fi
if [ "$release_ready" = true ]; then release_committed=true; release_commit=$(git rev-parse HEAD); commit_files=$(git diff-tree --no-commit-id --name-only -r HEAD); if [ "$commit_files" != build.gradle ]; then echo "STOP: Version commit contains unexpected files."; release_ready=false; fi; fi
if [ "$release_ready" = true ]; then git tag -a v1.0.0 -m "Release v1.0.0" || release_ready=false; fi
if [ "$release_ready" = true ]; then release_tag_created=true; tag_type=$(git cat-file -t v1.0.0); tag_commit=$(git rev-list -n 1 v1.0.0); exact_tag=$(git describe --tags --exact-match HEAD 2>/dev/null); if [ "$tag_type" != tag ] || [ "$tag_commit" != "$release_commit" ] || [ "$exact_tag" != v1.0.0 ]; then echo "STOP: Annotated final tag verification failed."; release_ready=false; fi; fi
if [ "$release_ready" = true ]; then if git push origin master; then master_pushed=true; else echo "STOP: Team master push failed; v1.0.0 was not pushed."; release_ready=false; fi; fi
if [ "$release_ready" = true ]; then if git push origin v1.0.0; then tag_pushed=true; else echo "STOP: Team master was pushed, but final tag v1.0.0 was NOT pushed."; release_ready=false; fi; fi
if [ "$release_ready" = true ]; then
  git fetch origin || release_ready=false
  local_head=$(git rev-parse HEAD); remote_head=$(git rev-parse origin/master); local_tag=$(git rev-list -n 1 v1.0.0); remote_tag=$(git ls-remote origin refs/tags/v1.0.0^{} | awk '{print $1}')
  exact_tag=$(git describe --tags --exact-match HEAD 2>/dev/null); clean=$(git status --porcelain); final_version_count=$(grep -Ec "^[[:space:]]*version[[:space:]]*=[[:space:]]*'1\\.0\\.0'[[:space:]]*$" build.gradle || true)
  if [ "$local_head" != "$remote_head" ] || [ "$local_tag" != "$remote_tag" ] || [ "$exact_tag" != v1.0.0 ] || [ -n "$clean" ] || [ "$final_version_count" -ne 1 ]; then echo "STOP: Post-push final release verification failed."; release_ready=false; fi
fi
if [ "$release_ready" = true ]; then
  echo "FINAL RELEASE:"; echo "Version: 1.0.0"; echo "Tag: v1.0.0"; echo "Release commit: $(git rev-parse --short HEAD)"; echo "Team master: $(git rev-parse --short origin/master)"; release_succeeded=true
fi
if [ "$release_ready" != true ] && [ "$version_changed" = true ] && [ "$release_committed" != true ]; then
  cleanup_head=$(git rev-parse HEAD 2>/dev/null || true); unexpected=$(git diff --name-only HEAD | grep -Ev '^build\\.gradle$' || true); staged_unexpected=$(git diff --cached --name-only | grep -Ev '^build\\.gradle$' || true); untracked=$(git ls-files --others --exclude-standard)
  if [ "$cleanup_head" = "$release_baseline" ] && [ -z "$unexpected" ] && [ -z "$staged_unexpected" ] && [ -z "$untracked" ]; then git restore --staged -- build.gradle >/dev/null 2>&1 || true; git restore -- build.gradle; echo "Step 11 restored build.gradle to the recorded baseline."; else echo "STOP: State is ambiguous; build.gradle was not cleaned automatically."; fi
fi
if [ "$release_ready" != true ] && [ "$release_committed" = true ]; then echo "STOP: A local release commit exists. Local tag created: $release_tag_created. Review push state without rewriting history."; fi`;

  const finalReleasePowerShellBody = `$releaseReady = $true
$releaseSucceeded = $false; $releaseCommitted = $false; $releaseTagCreated = $false; $versionChanged = $false
$expectedPersonalRepo = Join-Path $memberRoot "${targets.personalFolderName}"
if (-not (Test-Path (Join-Path $expectedPersonalRepo ".git"))) { Write-Host "STOP: This is not the configured finalisation owner's member workspace."; $releaseReady = $false }
if ($releaseReady) { $personalOrigin=(git -C $expectedPersonalRepo remote get-url origin 2>$null).Trim(); if ($LASTEXITCODE -ne 0 -or $personalOrigin -ne "${targets.personalRepoUrl}") { Write-Host "STOP: The sibling personal repository does not match the configured owner."; $releaseReady=$false } }
if ($releaseReady) { $dirty=@(git status --porcelain); if ($dirty.Count -ne 0) { Write-Host "STOP: Step 11 requires a completely clean IM repository."; $releaseReady=$false } }
if ($releaseReady) { $startingBranch=(git branch --show-current).Trim(); if ($startingBranch -ne "master") { Write-Host "STOP: Step 11 must start with the IM repository already on master."; $releaseReady=$false } }
if ($releaseReady) { git fetch origin; if ($LASTEXITCODE -ne 0) {$releaseReady=$false} }
if ($releaseReady) {
  $releaseBaseline=(git rev-parse HEAD).Trim(); $originHead=(git rev-parse origin/master).Trim(); $branch=(git branch --show-current).Trim(); $subject=(git log -1 --format=%s).Trim(); $headFiles=@(git diff-tree --no-commit-id --name-only -r HEAD | Sort-Object); $latestTag=(git describe --tags --abbrev=0).Trim()
  $build=Get-Content -Raw build.gradle; $oldCount=([regex]::Matches($build,"(?m)^\\s*version\\s*=\\s*'0\\.4\\.0'\\s*$")).Count
  git rev-parse -q --verify refs/tags/v1.0.0 2>$null | Out-Null; $localTagExists=$LASTEXITCODE -eq 0
  git ls-remote --exit-code --tags origin refs/tags/v1.0.0 2>$null | Out-Null; $remoteTagExists=$LASTEXITCODE -eq 0
  if ($branch -ne "master" -or $releaseBaseline -ne $originHead -or $subject -ne "Finalise assignment documentation and build" -or $headFiles.Count -ne 2 -or $headFiles[0] -ne "Makefile" -or $headFiles[1] -ne "README.md" -or -not (Test-Path README.md) -or -not (Test-Path Makefile) -or $latestTag -ne "v0.4.0" -or $localTagExists -or $remoteTagExists -or $oldCount -ne 1) { Write-Host "STOP: Step 11 pre-flight validation failed."; $releaseReady = $false }
}
if ($releaseReady) { $build=Get-Content -Raw build.gradle; $updated=[regex]::Replace($build,"(?m)^\\s*version\\s*=\\s*'0\\.4\\.0'\\s*$","version = '1.0.0'"); [IO.File]::WriteAllText((Resolve-Path build.gradle),$updated,(New-Object Text.UTF8Encoding($false))); $versionChanged=$true }
if ($releaseReady) { $tracked = @(git diff --name-only HEAD); $staged = @(git diff --cached --name-only); $untracked = @(git ls-files --others --exclude-standard); $newCount = ([regex]::Matches((Get-Content -Raw build.gradle),"(?m)^\\s*version\\s*=\\s*'1\\.0\\.0'\\s*$")).Count; if ($tracked.Count -ne 1 -or $tracked[0] -ne "build.gradle" -or $staged.Count -ne 0 -or $untracked.Count -ne 0 -or $newCount -ne 1) { Write-Host "STOP: Controlled build.gradle version update verification failed."; $releaseReady = $false } }
if ($releaseReady) { git diff --check; if ($LASTEXITCODE -ne 0) { $releaseReady = $false } }
foreach ($command in @("make clean","make compile","make test","gradle clean","gradle classes","gradle testClasses","gradle test","gradle jacocoTestReport")) { if ($releaseReady) { Invoke-Expression $command; if ($LASTEXITCODE -ne 0) { Write-Host "STOP: $command failed."; $releaseReady = $false } } }
if ($releaseReady) { $coverage=@'
import os, sys, xml.etree.ElementTree as ET
required=os.environ["COVERAGE_CLASSES"].split(","); root=ET.parse("build/reports/jacoco/test/jacocoTestReport.xml").getroot(); results={}
for node in root.findall(".//class"):
 name=node.get("name","").split("/")[-1]
 if name in required:
  counter=node.find("./counter[@type='LINE']")
  if counter is not None: results[name]=(int(counter.get("missed","0")),int(counter.get("covered","0")))
print("COVERAGE:")
for name in required:
 missed,covered=results.get(name,(-1,0)); total=missed+covered; print(f"{name}: {(0 if missed<0 else (100 if total==0 else covered*100/total)):.0f}% (missed={missed}, covered={covered})")
missed=sum(v[0] for v in results.values());covered=sum(v[1] for v in results.values());total=missed+covered;print(f"Overall line coverage: {(100 if total==0 else covered*100/total):.0f}%")
${coverageDecisionPython}
'@; $env:COVERAGE_CLASSES="${coverageClasses}"; $coverage | python3 -; if ($LASTEXITCODE -ne 0) { Write-Host "STOP: Production LINE coverage is not 100%."; $releaseReady = $false } }
if ($releaseReady) { gradle build; if ($LASTEXITCODE -ne 0) { $releaseReady = $false } }
if ($releaseReady) { git fetch origin; if ($LASTEXITCODE -ne 0) { $releaseReady = $false } }
if ($releaseReady) { $originNow=(git rev-parse origin/master).Trim(); $headNow=(git rev-parse HEAD).Trim(); $tracked=@(git diff --name-only HEAD); $staged=@(git diff --cached --name-only); $untracked=@(git ls-files --others --exclude-standard); if ($originNow -ne $releaseBaseline) { Write-Host "STOP: Team master changed during final release. Restart Step 11 from the latest team master."; $releaseReady=$false } elseif ($headNow -ne $releaseBaseline -or $tracked.Count -ne 1 -or $tracked[0] -ne "build.gradle" -or $staged.Count -ne 0 -or $untracked.Count -ne 0) { Write-Host "STOP: Repository state changed during final release validation."; $releaseReady=$false } }
if ($releaseReady) { git add build.gradle; if ($LASTEXITCODE -ne 0) { $releaseReady=$false } }
if ($releaseReady) { git commit -m "Finalise version 1.0.0" -m "Set the project version for the final assignment release."; if ($LASTEXITCODE -ne 0) { $releaseReady=$false } else { $releaseCommitted=$true } }
if ($releaseReady) { $releaseCommit=(git rev-parse HEAD).Trim(); $files=@(git diff-tree --no-commit-id --name-only -r HEAD); if ($files.Count -ne 1 -or $files[0] -ne "build.gradle") { Write-Host "STOP: Version commit contains unexpected files."; $releaseReady=$false } }
if ($releaseReady) { git tag -a v1.0.0 -m "Release v1.0.0"; if ($LASTEXITCODE -ne 0) { $releaseReady=$false } else { $releaseTagCreated=$true } }
if ($releaseReady) { $type=(git cat-file -t v1.0.0).Trim(); $tagCommit=(git rev-list -n 1 v1.0.0).Trim(); $exact=(git describe --tags --exact-match HEAD).Trim(); if ($type -ne "tag" -or $tagCommit -ne $releaseCommit -or $exact -ne "v1.0.0") { Write-Host "STOP: Annotated final tag verification failed."; $releaseReady=$false } }
if ($releaseReady) { git push origin master; if ($LASTEXITCODE -ne 0) { Write-Host "STOP: Team master push failed; v1.0.0 was not pushed."; $releaseReady=$false } else { $masterPushed=$true } }
if ($releaseReady) { git push origin v1.0.0; if ($LASTEXITCODE -ne 0) { Write-Host "STOP: Team master was pushed, but final tag v1.0.0 was NOT pushed."; $releaseReady=$false } else { $tagPushed=$true } }
if ($releaseReady) { git fetch origin; $localHead=(git rev-parse HEAD).Trim(); $remoteHead=(git rev-parse origin/master).Trim(); $localTag=(git rev-list -n 1 v1.0.0).Trim(); $remoteTag=((git ls-remote origin 'refs/tags/v1.0.0^{}') -split '\\s+')[0]; $exact=(git describe --tags --exact-match HEAD).Trim(); $clean=@(git status --porcelain); $finalVersionCount=([regex]::Matches((Get-Content -Raw build.gradle),"(?m)^\\s*version\\s*=\\s*'1\\.0\\.0'\\s*$")).Count; if ($localHead -ne $remoteHead -or $localTag -ne $remoteTag -or $exact -ne "v1.0.0" -or $clean.Count -ne 0 -or $finalVersionCount -ne 1) { Write-Host "STOP: Post-push final release verification failed."; $releaseReady=$false } }
if ($releaseReady) { Write-Host "FINAL RELEASE:"; Write-Host "Version: 1.0.0"; Write-Host "Tag: v1.0.0"; Write-Host "Release commit: $(git rev-parse --short HEAD)"; Write-Host "Team master: $(git rev-parse --short origin/master)"; $releaseSucceeded=$true }
if (-not $releaseReady -and $versionChanged -and -not $releaseCommitted) { $cleanupHead=(git rev-parse HEAD 2>$null).Trim(); $unexpected=@(git diff --name-only HEAD | Where-Object { $_ -ne "build.gradle" }); $stagedUnexpected=@(git diff --cached --name-only | Where-Object { $_ -ne "build.gradle" }); $untracked=@(git ls-files --others --exclude-standard); if ($cleanupHead -eq $releaseBaseline -and $unexpected.Count -eq 0 -and $stagedUnexpected.Count -eq 0 -and $untracked.Count -eq 0) { git restore --staged -- build.gradle 2>$null; git restore -- build.gradle; Write-Host "Step 11 restored build.gradle to the recorded baseline." } else { Write-Host "STOP: State is ambiguous; build.gradle was not cleaned automatically." } }
if (-not $releaseReady -and $releaseCommitted) { Write-Host "STOP: A local release commit exists. Local tag created: $releaseTagCreated. Review push state without rewriting history." }`;

  finalReleaseCommands.textContent = selectedOperatingSystem() === "windows"
    ? powershellRepositoryStep({ folder: targets.imFolderName, repositoryLabel: "Integration Manager repository", remotes: { origin: targets.teamRepoUrl }, body: finalReleasePowerShellBody, successVariable: "$releaseSucceeded", readyMessage: "READY FOR FINAL PERSONAL SYNC" })
    : bashRepositoryStep({ folder: targets.imFolderName, repositoryLabel: "Integration Manager repository", remotes: { origin: targets.teamRepoUrl }, body: finalReleaseBashBody, successVariable: "$release_succeeded", readyMessage: "READY FOR FINAL PERSONAL SYNC" });
}

function clearFeatureGuidance(message) {
  repositoryStateNote.textContent = message;
  startFeatureCommands.textContent = "";
  productionInstruction.textContent = message;
  productionCodeLabel.textContent = "Java production method";
  productionCode.textContent = "";
  testFileNote.textContent = message;
  testCodeLabel.textContent = "Java test method(s)";
  testCode.textContent = "";
  changelogLine.textContent = "";
  changelogInstruction.textContent = message;
  commitPushCommands.textContent = "";
  integrationCommands.textContent = "";
  integrationTestNote.textContent = message;
}

function renderFinalPersonalSyncGuidance() {
  const modeKey = testModeToggle.checked ? "test" : "production";
  const member = TEAM_MEMBERS.find((candidate) => candidate.name === selectedMember);
  const unikey = cleanUnikey(member?.unikeys[modeKey] || "");
  const available = Boolean(member) && currentRound === 3 && validUnikey(unikey);

  finalPersonalSyncStep.classList.toggle("step-disabled", !available);
  finalPersonalSyncStep.setAttribute("aria-disabled", String(!available));
  finalPersonalSyncContent.classList.toggle("hidden", !available);
  if (!available) {
    finalPersonalSyncCommands.textContent = "";
    finalPersonalSyncMessage.textContent = !member
      ? "Select a member to generate their final personal sync."
      : currentRound !== 3
        ? "Final Personal Sync is available after the Round 3 final team release."
        : `STOP: Missing configured unikey for ${member.name}.`;
    return;
  }

  const targets = resolveRepositoryTargets(unikey);
  finalPersonalSyncMessage.textContent = `${member.name}: run this from the member root containing ${targets.personalFolderName}. It verifies the final team v1.0.0 release, fast-forwards personal master, and pushes only master and v1.0.0.`;

  const bashBody = `sync_ready=true
sync_succeeded=false
master_pushed=false
personal_baseline=""
team_baseline=""

if [ "$(git branch --show-current)" != master ]; then echo "STOP: Step 12 must start with the personal repository already on master."; sync_ready=false; fi
if [ "$sync_ready" = true ] && [ -n "$(git status --porcelain)" ]; then echo "STOP: Personal repository must be completely clean."; sync_ready=false; fi
if [ "$sync_ready" = true ] && ! git fetch origin; then echo "STOP: Could not fetch personal origin."; sync_ready=false; fi
if [ "$sync_ready" = true ] && ! git fetch upstream; then echo "STOP: Could not fetch team upstream."; sync_ready=false; fi
if [ "$sync_ready" = true ]; then
  personal_baseline=$(git rev-parse HEAD) || sync_ready=false
  origin_baseline=$(git rev-parse origin/master) || sync_ready=false
  team_baseline=$(git rev-parse upstream/master) || sync_ready=false
  upstream_subject=$(git log -1 --format=%s upstream/master)
  upstream_files=$(git diff-tree --no-commit-id --name-only -r upstream/master)
  parent_subject=$(git log -1 --format=%s upstream/master^)
  parent_files=$(git diff-tree --no-commit-id --name-only -r upstream/master^ | sort)
  expected_parent_files=$(printf '%s\n' Makefile README.md | sort)
  upstream_version_count=$(git show upstream/master:build.gradle | grep -Ec "^[[:space:]]*version[[:space:]]*=[[:space:]]*'1\\.0\\.0'[[:space:]]*$" || true)
  remote_tag_object=$(git ls-remote --tags upstream refs/tags/v1.0.0 | awk '{print $1}')
  remote_tag_commit=$(git ls-remote --tags upstream 'refs/tags/v1.0.0^{}' | awk '{print $1}')
  if [ "$personal_baseline" != "$origin_baseline" ]; then echo "STOP: Local personal master does not match personal origin/master."; sync_ready=false; fi
  if ! git merge-base --is-ancestor "$personal_baseline" "$team_baseline"; then echo "STOP: Personal master contains commits not present in team master. Review before final sync."; sync_ready=false; fi
  if [ "$upstream_subject" != "Finalise version 1.0.0" ] || [ "$upstream_files" != build.gradle ]; then echo "STOP: Team master is not the expected final version commit."; sync_ready=false; fi
  if [ "$parent_subject" != "Finalise assignment documentation and build" ] || [ "$parent_files" != "$expected_parent_files" ]; then echo "STOP: Team master does not contain the verified Step 10 parent commit."; sync_ready=false; fi
  if [ "$upstream_version_count" -ne 1 ] || [ -z "$remote_tag_object" ] || [ "$remote_tag_commit" != "$team_baseline" ]; then echo "STOP: Team v1.0.0 release or annotated tag is incomplete."; sync_ready=false; fi
fi
if [ "$sync_ready" = true ] && git rev-parse -q --verify refs/tags/v1.0.0 >/dev/null; then
  local_tag_object=$(git rev-parse refs/tags/v1.0.0); local_tag_commit=$(git rev-list -n 1 v1.0.0)
  if [ "$local_tag_object" != "$remote_tag_object" ] || [ "$local_tag_commit" != "$team_baseline" ] || [ "$(git cat-file -t v1.0.0)" != tag ]; then echo "STOP: Local v1.0.0 does not match team v1.0.0."; sync_ready=false; fi
fi
if [ "$sync_ready" = true ] && ! git merge --no-edit --ff-only upstream/master; then echo "STOP: Personal master could not fast-forward to team master."; sync_ready=false; fi
if [ "$sync_ready" = true ]; then
  if [ "$(git rev-parse HEAD)" != "$team_baseline" ] || [ -n "$(git status --porcelain)" ] || [ ! -f README.md ] || [ ! -f Makefile ]; then echo "STOP: Fast-forward result does not exactly match team master."; sync_ready=false; fi
  version_count=$(grep -Ec "^[[:space:]]*version[[:space:]]*=[[:space:]]*'1\\.0\\.0'[[:space:]]*$" build.gradle || true)
  if [ "$version_count" -ne 1 ]; then echo "STOP: Personal build.gradle is not version 1.0.0."; sync_ready=false; fi
fi
if [ "$sync_ready" = true ] && ! git rev-parse -q --verify refs/tags/v1.0.0 >/dev/null; then
  if ! git fetch upstream refs/tags/v1.0.0:refs/tags/v1.0.0; then echo "STOP: Could not obtain v1.0.0 from team upstream."; sync_ready=false; fi
fi
if [ "$sync_ready" = true ]; then
  if [ "$(git cat-file -t v1.0.0)" != tag ] || [ "$(git rev-parse refs/tags/v1.0.0)" != "$remote_tag_object" ] || [ "$(git rev-list -n 1 v1.0.0)" != "$team_baseline" ]; then echo "STOP: Local final tag does not exactly match the annotated team tag."; sync_ready=false; fi
fi
if [ "$sync_ready" = true ] && ! git fetch upstream; then sync_ready=false; fi
if [ "$sync_ready" = true ]; then
  current_team=$(git rev-parse upstream/master); current_team_tag=$(git ls-remote --tags upstream 'refs/tags/v1.0.0^{}' | awk '{print $1}')
  if [ "$current_team" != "$team_baseline" ] || [ "$current_team_tag" != "$team_baseline" ]; then echo "STOP: Team final release changed during personal sync. Restart Step 12."; sync_ready=false; fi
fi
if [ "$sync_ready" = true ] && ! git fetch origin; then sync_ready=false; fi
if [ "$sync_ready" = true ] && [ "$(git rev-parse origin/master)" != "$personal_baseline" ]; then echo "STOP: Personal origin/master changed during final sync. Restart Step 12."; sync_ready=false; fi
if [ "$sync_ready" = true ]; then if git push origin master; then master_pushed=true; else echo "STOP: Personal master push failed; v1.0.0 was not pushed."; sync_ready=false; fi; fi
if [ "$sync_ready" = true ]; then if git push origin v1.0.0; then tag_pushed=true; else echo "STOP: Personal master was pushed, but v1.0.0 was NOT pushed."; sync_ready=false; fi; fi
if [ "$sync_ready" = true ]; then
  git fetch origin || sync_ready=false
  local_head=$(git rev-parse HEAD); origin_head=$(git rev-parse origin/master); upstream_head=$(git rev-parse upstream/master)
  local_tag=$(git rev-list -n 1 v1.0.0); origin_tag=$(git ls-remote --tags origin 'refs/tags/v1.0.0^{}' | awk '{print $1}'); upstream_tag=$(git ls-remote --tags upstream 'refs/tags/v1.0.0^{}' | awk '{print $1}')
  if [ "$local_head" != "$origin_head" ] || [ "$local_head" != "$upstream_head" ] || [ "$local_tag" != "$origin_tag" ] || [ "$local_tag" != "$upstream_tag" ] || [ -n "$(git status --porcelain)" ] || [ ! -f README.md ] || [ ! -f Makefile ]; then echo "STOP: Post-push personal repository verification failed."; sync_ready=false; fi
fi
if [ "$sync_ready" = true ]; then echo "FINAL PERSONAL SYNC:"; echo "Member: ${member.name}"; echo "Unikey: ${unikey}"; echo "Version: 1.0.0"; echo "Tag: v1.0.0"; echo "Personal master: $(git rev-parse --short HEAD)"; echo "Team master: $(git rev-parse --short upstream/master)"; sync_succeeded=true; fi
if [ "$sync_ready" != true ] && [ -n "$personal_baseline" ] && [ "$(git rev-parse HEAD 2>/dev/null)" != "$personal_baseline" ]; then echo "STOP: Personal master was fast-forwarded locally but the sync did not complete. No history was reset; review the reported state."; fi`;

  const powershellBody = `$syncReady=$true; $syncSucceeded=$false; $masterPushed=$false; $personalBaseline=""; $teamBaseline=""
if ((git branch --show-current).Trim() -ne "master") { Write-Host "STOP: Step 12 must start with the personal repository already on master."; $syncReady=$false }
if ($syncReady -and @(git status --porcelain).Count -ne 0) { Write-Host "STOP: Personal repository must be completely clean."; $syncReady=$false }
if ($syncReady) { git fetch origin; if($LASTEXITCODE-ne0){$syncReady=$false} }
if ($syncReady) { git fetch upstream; if($LASTEXITCODE-ne0){$syncReady=$false} }
if ($syncReady) {
 $personalBaseline=(git rev-parse HEAD).Trim();$originBaseline=(git rev-parse origin/master).Trim();$teamBaseline=(git rev-parse upstream/master).Trim();$upstreamSubject=(git log -1 --format=%s upstream/master).Trim();$upstreamFiles=@(git diff-tree --no-commit-id --name-only -r upstream/master);$parentSubject=(git log -1 --format=%s upstream/master^).Trim();$parentFiles=@(git diff-tree --no-commit-id --name-only -r upstream/master^|Sort-Object);$versionCount=([regex]::Matches((git show upstream/master:build.gradle),"(?m)^\\s*version\\s*=\\s*'1\\.0\\.0'\\s*$")).Count;$remoteTagObject=((git ls-remote --tags upstream refs/tags/v1.0.0)-split'\\s+')[0];$remoteTagCommit=((git ls-remote --tags upstream 'refs/tags/v1.0.0^{}')-split'\\s+')[0]
 if($personalBaseline-ne$originBaseline){Write-Host "STOP: Local personal master does not match personal origin/master.";$syncReady=$false};git merge-base --is-ancestor $personalBaseline $teamBaseline;if($LASTEXITCODE-ne0){Write-Host "STOP: Personal master contains commits not present in team master. Review before final sync.";$syncReady=$false};if($upstreamSubject-ne"Finalise version 1.0.0"-or$upstreamFiles.Count-ne1-or$upstreamFiles[0]-ne"build.gradle"-or$parentSubject-ne"Finalise assignment documentation and build"-or$parentFiles.Count-ne2-or$parentFiles[0]-ne"Makefile"-or$parentFiles[1]-ne"README.md"-or$versionCount-ne1-or-not$remoteTagObject-or$remoteTagCommit-ne$teamBaseline){Write-Host "STOP: Team final release verification failed.";$syncReady=$false}
}
if($syncReady){git rev-parse -q --verify refs/tags/v1.0.0 2>$null|Out-Null;if($LASTEXITCODE-eq0){$localTagObject=(git rev-parse refs/tags/v1.0.0).Trim();$localTagCommit=(git rev-list -n 1 v1.0.0).Trim();$tagType=(git cat-file -t v1.0.0).Trim();if($localTagObject-ne$remoteTagObject-or$localTagCommit-ne$teamBaseline-or$tagType-ne"tag"){Write-Host "STOP: Local v1.0.0 does not match team v1.0.0.";$syncReady=$false}}}
if($syncReady){git merge --no-edit --ff-only upstream/master;if($LASTEXITCODE-ne0){Write-Host "STOP: Personal master could not fast-forward to team master.";$syncReady=$false}}
if($syncReady){if((git rev-parse HEAD).Trim()-ne$teamBaseline-or@(git status --porcelain).Count-ne0-or-not(Test-Path README.md)-or-not(Test-Path Makefile)){Write-Host "STOP: Fast-forward result does not exactly match team master.";$syncReady=$false}}
if($syncReady){git rev-parse -q --verify refs/tags/v1.0.0 2>$null|Out-Null;if($LASTEXITCODE-ne0){git fetch upstream refs/tags/v1.0.0:refs/tags/v1.0.0;if($LASTEXITCODE-ne0){$syncReady=$false}}}
if($syncReady){if((git cat-file -t v1.0.0).Trim()-ne"tag"-or(git rev-parse refs/tags/v1.0.0).Trim()-ne$remoteTagObject-or(git rev-list -n 1 v1.0.0).Trim()-ne$teamBaseline){Write-Host "STOP: Local final tag does not match team tag.";$syncReady=$false}}
if($syncReady){git fetch upstream;$currentTeam=(git rev-parse upstream/master).Trim();$currentTag=((git ls-remote --tags upstream 'refs/tags/v1.0.0^{}')-split'\\s+')[0];if($currentTeam-ne$teamBaseline-or$currentTag-ne$teamBaseline){Write-Host "STOP: Team final release changed during personal sync. Restart Step 12.";$syncReady=$false}}
if($syncReady){git fetch origin;if((git rev-parse origin/master).Trim()-ne$personalBaseline){Write-Host "STOP: Personal origin/master changed during final sync. Restart Step 12.";$syncReady=$false}}
if($syncReady){git push origin master;if($LASTEXITCODE-ne0){Write-Host "STOP: Personal master push failed; v1.0.0 was not pushed.";$syncReady=$false}else{$masterPushed=$true}}
if($syncReady){git push origin v1.0.0;if($LASTEXITCODE-ne0){Write-Host "STOP: Personal master was pushed, but v1.0.0 was NOT pushed.";$syncReady=$false}}
if($syncReady){git fetch origin;$localHead=(git rev-parse HEAD).Trim();$originHead=(git rev-parse origin/master).Trim();$upstreamHead=(git rev-parse upstream/master).Trim();$localTag=(git rev-list -n 1 v1.0.0).Trim();$originTag=((git ls-remote --tags origin 'refs/tags/v1.0.0^{}')-split'\\s+')[0];$upstreamTag=((git ls-remote --tags upstream 'refs/tags/v1.0.0^{}')-split'\\s+')[0];if($localHead-ne$originHead-or$localHead-ne$upstreamHead-or$localTag-ne$originTag-or$localTag-ne$upstreamTag-or@(git status --porcelain).Count-ne0){Write-Host "STOP: Post-push personal repository verification failed.";$syncReady=$false}}
if($syncReady){Write-Host "FINAL PERSONAL SYNC:";Write-Host "Member: ${member.name}";Write-Host "Unikey: ${unikey}";Write-Host "Version: 1.0.0";Write-Host "Tag: v1.0.0";Write-Host "Personal master: $(git rev-parse --short HEAD)";Write-Host "Team master: $(git rev-parse --short upstream/master)";$syncSucceeded=$true}
if(-not$syncReady-and$personalBaseline-and(git rev-parse HEAD).Trim()-ne$personalBaseline){Write-Host "STOP: Personal master was fast-forwarded locally but the sync did not complete. No history was reset; review the reported state."}`;

  const normalizedPowerShellBody = powershellBody
    .replaceAll("-ne", " -ne ")
    .replaceAll("-eq", " -eq ")
    .replaceAll("-or", " -or ")
    .replaceAll("-and", " -and ")
    .replaceAll("-not", " -not ");

  finalPersonalSyncCommands.textContent = selectedOperatingSystem() === "windows"
    ? powershellRepositoryStep({ folder: targets.personalFolderName, repositoryLabel: "personal repository", remotes: { origin: targets.personalRepoUrl, upstream: targets.teamRepoUrl }, body: normalizedPowerShellBody, successVariable: "$syncSucceeded", readyMessage: "READY TO SUBMIT PERSONAL REPOSITORY" })
    : bashRepositoryStep({ folder: targets.personalFolderName, repositoryLabel: "personal repository", remotes: { origin: targets.personalRepoUrl, upstream: targets.teamRepoUrl }, body: bashBody, successVariable: "$sync_succeeded", readyMessage: "READY TO SUBMIT PERSONAL REPOSITORY" });
}

function renderWorkflowGuidance(assignment) {
  renderReleaseGuidance();

  if (!assignment || !assignment.method) {
    clearFeatureGuidance(
      assignment ? "No method assigned this round." : "Select a member to generate workflow guidance.",
    );
    return;
  }

  const classFiles = ASSIGNMENT_DATA.classes[assignment.className];
  const validation = validationForAssignment(assignment);
  const featureTestCommand = gradleSpecificTestsCommand(validation.tests);
  const isCrossRoundDeferred = validation.mandatoryReleaseRound > currentRound;
  const enteredUnikey = cleanUnikey(unikeyInput.value);
  const hasValidUnikey = validUnikey(enteredUnikey);
  const targets = resolveRepositoryTargets(enteredUnikey);
  const personalFolder = targets.personalFolderName;
  const usesPowerShell = selectedOperatingSystem() === "windows";
  const changelogEntries = assignment.changelogEntries || [assignment.changelog];
  const changelogDisplay = changelogEntries.join("\n");
  const powershellChangelogEntries = changelogEntries
    .map((entry) => `"${entry.replaceAll("`", "``").replaceAll('"', '`"')}"`)
    .join(", ");
  const bashChangelogEntries = changelogEntries
    .map((entry) => `'${entry.replaceAll("'", "'\\''")}'`)
    .join(" ");
  const guardedTeamMasterPush = usesPowerShell
    ? `git fetch origin
    if ($LASTEXITCODE -ne 0) {
      Write-Host "STOP: Could not refresh origin before the final push. Team master was not pushed."
    } else {
      $currentTeamMaster = (git rev-parse origin/master).Trim()
      if ($currentTeamMaster -ne $integrationBaseline) {
        Write-Host "STOP: Team master changed during this integration."
        Write-Host "Another integration was pushed while this step was running."
        Write-Host "Restart Step 07 from the latest team master."
        Write-Host "Team master was not pushed."
      } else {
        git push origin master
        if ($LASTEXITCODE -eq 0) { $workflowSucceeded = $true }
      }
    }`
    : `if git fetch origin; then
      current_team_master=$(git rev-parse origin/master)
      if [ "$current_team_master" != "$integration_baseline" ]; then
        echo "STOP: Team master changed during this integration."
        echo "Another integration was pushed while this step was running."
        echo "Restart Step 07 from the latest team master."
        echo "Team master was not pushed."
      elif git push origin master; then
        workflow_succeeded=true
      fi
    else
      echo "STOP: Could not refresh origin before the final push. Team master was not pushed."
    fi`;
  const postMergeValidation = usesPowerShell
    ? `git status
git diff --check
if ($LASTEXITCODE -eq 0) { git diff --cached --check }
if ($LASTEXITCODE -eq 0) { gradle classes }
if ($LASTEXITCODE -eq 0) { gradle testClasses }
if ($LASTEXITCODE -eq 0) {
  ${featureTestCommand}
  if ($LASTEXITCODE -eq 0) {
    Write-Host "PASS: The selected feature test passed."
    ${guardedTeamMasterPush}
  }${isCrossRoundDeferred ? ` else {
    Write-Host "DEFERRED: This feature depends on methods scheduled for later rounds. Compilation passed, but its feature test is not mandatory until Round ${validation.mandatoryReleaseRound}."
    Write-Host "This test must be revalidated at the Round ${validation.mandatoryReleaseRound} release gate."
    ${guardedTeamMasterPush}
  }` : ` else {
    Write-Host "STOP: The selected independent feature test failed. Team master was not pushed."
  }`}
} else {
  Write-Host "STOP: Working-tree, production compilation, or test compilation validation failed. Team master was not pushed."
}`
    : `git status
if git diff --check && git diff --cached --check && gradle classes && gradle testClasses; then
  if ${featureTestCommand}; then
    echo "PASS: The selected feature test passed."
    ${guardedTeamMasterPush}
  ${isCrossRoundDeferred ? `else
    echo "DEFERRED: This feature depends on methods scheduled for later rounds. Compilation passed, but its feature test is not mandatory until Round ${validation.mandatoryReleaseRound}."
    echo "This test must be revalidated at the Round ${validation.mandatoryReleaseRound} release gate."
    ${guardedTeamMasterPush}` : `else
    echo "STOP: The selected independent feature test failed. Team master was not pushed."`}
  fi
else
  echo "STOP: Working-tree, production compilation, or test compilation validation failed. Team master was not pushed."
fi`;
  const guardedIntegration = usesPowerShell
    ? `$integrationReady = $true
$workflowSucceeded = $false
git checkout master
if ($LASTEXITCODE -ne 0) { $integrationReady = $false }
if ($integrationReady) { git fetch origin }
if ($integrationReady -and $LASTEXITCODE -ne 0) { $integrationReady = $false }
if ($integrationReady) { git merge --no-edit origin/master }
if ($integrationReady -and $LASTEXITCODE -ne 0) { $integrationReady = $false }
if ($integrationReady) {
  $integrationBaseline = (git rev-parse origin/master).Trim()
  if ($LASTEXITCODE -ne 0) { $integrationReady = $false }
}
if ($integrationReady) { git fetch me }
if ($integrationReady -and $LASTEXITCODE -ne 0) { $integrationReady = $false }

if ($integrationReady) {
  git merge --no-ff --no-edit me/${assignment.branch}
  if ($LASTEXITCODE -eq 0) {
    ${postMergeValidation}
  } else {
    git rev-parse -q --verify MERGE_HEAD *> $null
    $mergeInProgress = $LASTEXITCODE -eq 0
    $unresolvedFiles = @(git diff --name-only --diff-filter=U)
    if ($mergeInProgress -and $unresolvedFiles.Count -eq 0) {
      Write-Host "MERGE READY TO COMMIT: Merge content is resolved, but the non-interactive merge commit is incomplete."
      git commit --no-edit
      if ($LASTEXITCODE -eq 0) {
        ${postMergeValidation}
      } else {
        Write-Host "STOP: The merge commit could not be completed. Team master was not pushed."
      }
    } elseif ($mergeInProgress -and $unresolvedFiles.Count -eq 1 -and $unresolvedFiles[0] -eq "CHANGELOG.md") {
      Write-Host "CHANGELOG-ONLY CONFLICT: resolving automatically..."
      $changelogReady = $true
      git checkout --ours CHANGELOG.md
      if ($LASTEXITCODE -ne 0) { $changelogReady = $false }
      if ($changelogReady) {
        $originalChangelog = [IO.File]::ReadAllText((Resolve-Path "CHANGELOG.md"))
        $entries = @(${powershellChangelogEntries})
        $originalLines = @($originalChangelog -split "\\r?\\n")
        $invalidEntryCount = @($entries | Where-Object { $entry = $_; @($originalLines | Where-Object { $_ -ceq $entry }).Count -gt 1 }).Count
        if ($invalidEntryCount -gt 0) {
          Write-Host "STOP: A selected CHANGELOG entry already appears more than once. Team master was not pushed."
          $changelogReady = $false
        } else {
          $entriesToInsert = @($entries | Where-Object { $entry = $_; @($originalLines | Where-Object { $_ -ceq $entry }).Count -eq 0 })
          $headingMatches = [regex]::Matches($originalChangelog, "(?m)^## Unreleased\\s*$")
          if ($headingMatches.Count -ne 1) {
            Write-Host "STOP: Expected exactly one ## Unreleased heading. CHANGELOG.md was not staged."
            $changelogReady = $false
          } elseif ($entriesToInsert.Count -gt 0) {
            $windowsNewline = ([string][char]13) + ([string][char]10)
            $newline = if ($originalChangelog.Contains($windowsNewline)) { $windowsNewline } else { [string][char]10 }
            $insertAt = $headingMatches[0].Index + $headingMatches[0].Length
            $expectedChangelog = $originalChangelog.Insert($insertAt, $newline + ($entriesToInsert -join $newline))
            [IO.File]::WriteAllText((Resolve-Path "CHANGELOG.md"), $expectedChangelog, (New-Object Text.UTF8Encoding($false)))
          } else {
            $expectedChangelog = $originalChangelog
          }
        }
      }
      if ($changelogReady) {
        $resolvedChangelog = [IO.File]::ReadAllText((Resolve-Path "CHANGELOG.md"))
        $resolvedLines = @($resolvedChangelog -split "\\r?\\n")
        $invalidResolvedCount = @($entries | Where-Object { $entry = $_; @($resolvedLines | Where-Object { $_ -ceq $entry }).Count -ne 1 }).Count
        $hasMarkers = $resolvedChangelog -match "(?m)^(<<<<<<<|=======|>>>>>>>)"
        git rev-parse -q --verify MERGE_HEAD *> $null
        if ($LASTEXITCODE -ne 0 -or $hasMarkers -or $invalidResolvedCount -ne 0 -or $resolvedChangelog -cne $expectedChangelog) {
          Write-Host "STOP: Automatic CHANGELOG verification failed. CHANGELOG.md was not staged and team master was not pushed."
          $changelogReady = $false
        }
      }
      if ($changelogReady) { git add CHANGELOG.md }
      if ($changelogReady -and $LASTEXITCODE -ne 0) { $changelogReady = $false }
      if ($changelogReady) {
        $remainingUnresolved = @(git diff --name-only --diff-filter=U)
        git rev-parse -q --verify MERGE_HEAD *> $null
        if ($LASTEXITCODE -ne 0 -or $remainingUnresolved.Count -ne 0) {
          Write-Host "STOP: Unresolved files remain or MERGE_HEAD disappeared. Team master was not pushed."
          $remainingUnresolved | ForEach-Object { Write-Host $_ }
          $changelogReady = $false
        }
      }
      if ($changelogReady) {
        Write-Host "CHANGELOG RESOLVED: preserved existing entries and added the selected feature entries."
        git commit --no-edit
        if ($LASTEXITCODE -eq 0) {
          ${postMergeValidation}
        } else {
          Write-Host "STOP: The automatic CHANGELOG merge commit failed. Team master was not pushed."
        }
      }
    } elseif ($mergeInProgress -and $unresolvedFiles.Count -gt 0) {
      Write-Host "STOP: Conflicts include Java, test, source, or multiple files. Resolve every file carefully; these conflicts are never handled automatically."
      $unresolvedFiles | ForEach-Object { Write-Host $_ }
      Write-Host "Team master was not pushed."
    } else {
      Write-Host "STOP: The feature merge failed and no merge is in progress. Review the Git output; no validation or push was run."
    }
  }
} else {
  Write-Host "STOP: Could not prepare team master or fetch the selected member's feature. No feature merge, tests, or push were run."
}`
    : `workflow_succeeded=false
integration_baseline=""
if git checkout master && \
    git fetch origin && \
    git merge --no-edit origin/master && \
    integration_baseline=$(git rev-parse origin/master) && \
    git fetch me; then
  if git merge --no-ff --no-edit me/${assignment.branch}; then
    ${postMergeValidation}
  else
    if git rev-parse -q --verify MERGE_HEAD >/dev/null 2>&1; then
      merge_in_progress=true
    else
      merge_in_progress=false
    fi
    unresolved_files=$(git diff --name-only --diff-filter=U)
    if [ "$merge_in_progress" = true ] && [ -z "$unresolved_files" ]; then
      echo "MERGE READY TO COMMIT: Merge content is resolved, but the non-interactive merge commit is incomplete."
      if git commit --no-edit; then
        ${postMergeValidation}
      else
        echo "STOP: The merge commit could not be completed. Team master was not pushed."
      fi
    elif [ "$merge_in_progress" = true ] && [ "$unresolved_files" = "CHANGELOG.md" ]; then
      echo "CHANGELOG-ONLY CONFLICT: resolving automatically..."
      changelog_ready=true
      changelog_base=".git/CHANGELOG.step07.ours"
      changelog_expected=".git/CHANGELOG.step07.expected"
      changelog_base_lines=".git/CHANGELOG.step07.base-lines"
      changelog_resolved_lines=".git/CHANGELOG.step07.resolved-lines"
      if ! git checkout --ours CHANGELOG.md; then changelog_ready=false; fi
      if [ "$changelog_ready" = true ]; then cp CHANGELOG.md "$changelog_base" || changelog_ready=false; fi
      changelog_entries=(${bashChangelogEntries})
      changelog_entries_file=".git/CHANGELOG.step07.entries"
      if [ "$changelog_ready" = true ]; then
        : > "$changelog_entries_file"
        for changelog_entry in "\${changelog_entries[@]}"; do
          entry_count=$(grep -Fxc -- "$changelog_entry" CHANGELOG.md || true)
          if [ "$entry_count" -gt 1 ]; then
            echo "STOP: A selected CHANGELOG entry already appears more than once. Team master was not pushed."
            changelog_ready=false
          elif [ "$entry_count" -eq 0 ]; then
            printf '%s\n' "$changelog_entry" >> "$changelog_entries_file" || changelog_ready=false
          fi
        done
        if [ "$changelog_ready" = true ]; then
          heading_count=$(grep -c '^## Unreleased[[:space:]]*$' CHANGELOG.md || true)
          if [ "$heading_count" -ne 1 ]; then
            echo "STOP: Expected exactly one ## Unreleased heading. CHANGELOG.md was not staged."
            changelog_ready=false
          elif ! awk -v entries_file="$changelog_entries_file" '{ print; if ($0 ~ /^## Unreleased[[:space:]]*$/) while ((getline entry < entries_file) > 0) print entry; close(entries_file) }' "$changelog_base" > "$changelog_expected"; then
            echo "STOP: Could not prepare the expected CHANGELOG.md. Team master was not pushed."
            changelog_ready=false
          elif ! cp "$changelog_expected" CHANGELOG.md; then
            echo "STOP: Could not update CHANGELOG.md. Team master was not pushed."
            changelog_ready=false
          fi
        fi
      fi
      if [ "$changelog_ready" = true ]; then
        for changelog_entry in "\${changelog_entries[@]}"; do
          resolved_entry_count=$(grep -Fxc -- "$changelog_entry" CHANGELOG.md || true)
          if [ "$resolved_entry_count" -ne 1 ]; then changelog_ready=false; fi
        done
        if ! git rev-parse -q --verify MERGE_HEAD >/dev/null 2>&1 ||
            grep -Eq '^(<<<<<<<|=======|>>>>>>>)' CHANGELOG.md || [ "$changelog_ready" != true ]; then
          echo "STOP: Automatic CHANGELOG verification failed. CHANGELOG.md was not staged and team master was not pushed."
          changelog_ready=false
        fi
      fi
      if [ "$changelog_ready" = true ]; then
        if ! awk '{ sub(/\\r$/, ""); print }' "$changelog_expected" > "$changelog_base_lines" ||
            ! awk '{ sub(/\\r$/, ""); print }' CHANGELOG.md > "$changelog_resolved_lines" ||
            ! cmp -s "$changelog_base_lines" "$changelog_resolved_lines"; then
          echo "STOP: Existing team CHANGELOG lines or their order changed unexpectedly. CHANGELOG.md was not staged."
          changelog_ready=false
        fi
      fi
      if [ "$changelog_ready" = true ] && ! git add CHANGELOG.md; then changelog_ready=false; fi
      if [ "$changelog_ready" = true ]; then
        remaining_unresolved=$(git diff --name-only --diff-filter=U)
        if ! git rev-parse -q --verify MERGE_HEAD >/dev/null 2>&1 || [ -n "$remaining_unresolved" ]; then
          echo "STOP: Unresolved files remain or MERGE_HEAD disappeared. Team master was not pushed."
          printf '%s\n' "$remaining_unresolved"
          changelog_ready=false
        fi
      fi
      if [ "$changelog_ready" = true ]; then
        echo "CHANGELOG RESOLVED: preserved existing entries and added the selected feature entries."
        if git commit --no-edit; then
          ${postMergeValidation}
        else
          echo "STOP: The automatic CHANGELOG merge commit failed. Team master was not pushed."
        fi
      fi
      rm -f "$changelog_base" "$changelog_expected" "$changelog_base_lines" "$changelog_resolved_lines" "$changelog_entries_file"
    elif [ "$merge_in_progress" = true ] && [ -n "$unresolved_files" ]; then
      echo "STOP: Conflicts include Java, test, source, or multiple files. Resolve every file carefully; these conflicts are never handled automatically."
      printf '%s\n' "$unresolved_files"
      echo "Team master was not pushed."
    else
      echo "STOP: The feature merge failed and no merge is in progress. Review the Git output; no validation or push was run."
    fi
  fi
else
  echo "STOP: Could not prepare team master or fetch the selected member's feature. No feature merge, tests, or push were run."
fi`;

  integrationTestNote.textContent = isCrossRoundDeferred
    ? `CROSS-ROUND DEPENDENCY: This method uses functionality assigned to later rounds. ` +
      `Step 07 must pass production and test compilation, then runs only ${validation.tests.join(", ")}. ` +
      `If that test fails, it is explicitly DEFERRED until the Round ${validation.mandatoryReleaseRound} release gate; the failure is not called a pass.`
    : `INDEPENDENT FEATURE: Step 07 must pass production and test compilation, then runs only ` +
      `${validation.tests.join(", ")}. A failing selected feature test blocks the team-master push.`;

  repositoryStateNote.textContent = hasValidUnikey
    ? `Run from the folder containing ${personalFolder}. Upstream is ${targets.teamRepoName}; the feature branch is created from updated master.`
    : "Complete Setup with a valid UniKey to replace <unikey> in the personal folder name.";

  integrationLocationLabel.textContent = `Run from ${targets.imFolderName}`;

  const startFeatureBody = usesPowerShell
    ? `$stepSucceeded = $false
git checkout master
if ($LASTEXITCODE -eq 0) { git fetch upstream }
if ($LASTEXITCODE -eq 0) { git merge --no-edit upstream/master }
if ($LASTEXITCODE -eq 0) {
  git show-ref --verify --quiet refs/heads/${assignment.branch}
  if ($LASTEXITCODE -eq 0) {
    git checkout ${assignment.branch}
  } else {
    git checkout -b ${assignment.branch}
  }
}
if ($LASTEXITCODE -eq 0) {
  $currentBranch = (git branch --show-current).Trim()
  if ($currentBranch -eq "${assignment.branch}") {
    git status
    if ($LASTEXITCODE -eq 0) { $stepSucceeded = $true }
  } else {
    Write-Host "STOP: Expected feature branch ${assignment.branch} is not checked out."
  }
}`
    : `step_succeeded=false
if git checkout master && git fetch upstream && git merge --no-edit upstream/master; then
  if git show-ref --verify --quiet refs/heads/${assignment.branch}; then
    git checkout ${assignment.branch}
  else
    git checkout -b ${assignment.branch}
  fi
  if [ "$(git branch --show-current)" = "${assignment.branch}" ] && git status; then
    step_succeeded=true
  else
    echo "STOP: Expected feature branch ${assignment.branch} is not checked out."
  fi
fi`;

  startFeatureCommands.textContent = usesPowerShell
    ? powershellRepositoryStep({
      folder: personalFolder,
      repositoryLabel: "personal repository",
      remotes: { origin: targets.personalRepoUrl, upstream: targets.teamRepoUrl },
      body: startFeatureBody,
      successVariable: "$stepSucceeded",
      nextStep: "03",
    })
    : bashRepositoryStep({
      folder: personalFolder,
      repositoryLabel: "personal repository",
      remotes: { origin: targets.personalRepoUrl, upstream: targets.teamRepoUrl },
      body: startFeatureBody,
      successVariable: "$step_succeeded",
      nextStep: "03",
    });

  const additionalProductionFiles = assignment.additionalProductionFiles || [];
  const additionalTestFiles = assignment.additionalTestFiles || [];
  const stagedProductionFiles = [classFiles.sourceFile, ...additionalProductionFiles.map((item) => item.file)];
  const stagedTestFiles = [classFiles.testFile, ...additionalTestFiles.map((item) => item.file)];
  const stagedFeatureFiles = [...stagedProductionFiles, ...stagedTestFiles, "CHANGELOG.md"].join(" ");

  productionInstruction.textContent =
    `LOCATION SAFETY: Edit inside ${personalFolder} only, with branch ${assignment.branch} checked out. ` +
    `FILE: ${classFiles.sourceFile} · ${assignment.productionInstruction} ` +
    "Copy only this method; do not replace the whole Java file.";
  productionCodeLabel.textContent = `REPLACE METHOD · ${assignment.method}`;
  productionCode.textContent = additionalProductionFiles.length
    ? [`FILE: ${classFiles.sourceFile}\nREPLACE METHOD: ${assignment.method}\n\n${assignment.productionSnippet}`,
      ...additionalProductionFiles.map((item) => `FILE: ${item.file}\nREPLACE METHOD: ${item.method}\n\n${item.snippet}`)].join("\n\n")
    : assignment.productionSnippet;
  testFileNote.textContent =
    `LOCATION SAFETY: Edit inside ${personalFolder} only, with branch ${assignment.branch} checked out. ` +
    `FILE: ${classFiles.testFile} · ${assignment.testInstruction} ` +
    "Use this existing shared class-level test file only.";
  testCodeLabel.textContent = assignment.testMethods.length
    ? `REPLACE / ADD TEST METHOD(S) · ${assignment.testMethods.join(", ")}`
    : "EXISTING TEST ASSERTIONS";
  testCode.textContent = additionalTestFiles.length
    ? [`FILE: ${classFiles.testFile}\n\n${assignment.testSnippet}`,
      ...additionalTestFiles.map((item) => `FILE: ${item.file}\nREPLACE / ADD: ${item.methods.join(", ")}\n\n${item.snippet}`)].join("\n\n")
    : assignment.testSnippet;
  testCode.dataset.placeholder = assignment.testSnippet
    ? ""
    : `No test code change required. ${assignment.testReference}`;
  changelogLine.textContent = changelogDisplay;
  changelogInstruction.textContent =
    `LOCATION SAFETY: Edit CHANGELOG.md inside ${personalFolder} only, with branch ${assignment.branch} checked out. ` +
    `Add ${changelogEntries.length === 1 ? "this exact line" : "these exact lines"} underneath ## Unreleased.`;

  const commitPushBody = usesPowerShell
    ? `$stepSucceeded = $false
$currentBranch = (git branch --show-current).Trim()
if ($currentBranch -ne "${assignment.branch}") {
  Write-Host "STOP: Step 06 requires branch ${assignment.branch}; current branch is $currentBranch. Nothing was staged or committed."
} else {
  git status
  if ($LASTEXITCODE -eq 0) { git add ${stagedFeatureFiles} }
  if ($LASTEXITCODE -eq 0) { git commit -m "${assignment.commitSubject}" -m "${assignment.commitBody}" }
  if ($LASTEXITCODE -eq 0) { git push -u origin ${assignment.branch} }
  if ($LASTEXITCODE -eq 0) { $stepSucceeded = $true }
}`
    : `step_succeeded=false
current_branch=$(git branch --show-current)
if [ "$current_branch" != "${assignment.branch}" ]; then
  echo "STOP: Step 06 requires branch ${assignment.branch}; current branch is $current_branch. Nothing was staged or committed."
else
  if git status && \
      git add ${stagedFeatureFiles} && \
      git commit -m "${assignment.commitSubject}" -m "${assignment.commitBody}" && \
      git push -u origin ${assignment.branch}; then
    step_succeeded=true
  fi
fi`;

  commitPushCommands.textContent = usesPowerShell
    ? powershellRepositoryStep({
      folder: personalFolder,
      repositoryLabel: "personal repository",
      remotes: { origin: targets.personalRepoUrl, upstream: targets.teamRepoUrl },
      body: commitPushBody,
      successVariable: "$stepSucceeded",
      nextStep: "07",
    })
    : bashRepositoryStep({
      folder: personalFolder,
      repositoryLabel: "personal repository",
      remotes: { origin: targets.personalRepoUrl, upstream: targets.teamRepoUrl },
      body: commitPushBody,
      successVariable: "$step_succeeded",
      nextStep: "07",
    });

  integrationCommands.textContent = usesPowerShell
    ? powershellRepositoryStep({
      folder: targets.imFolderName,
      repositoryLabel: "Integration Manager repository",
      remotes: { origin: targets.teamRepoUrl, me: targets.personalRepoUrl },
      body: guardedIntegration,
      successVariable: "$workflowSucceeded",
      nextStep: "08",
    })
    : bashRepositoryStep({
      folder: targets.imFolderName,
      repositoryLabel: "Integration Manager repository",
      remotes: { origin: targets.teamRepoUrl, me: targets.personalRepoUrl },
      body: guardedIntegration,
      successVariable: "$workflow_succeeded",
      nextStep: "08",
    });
}

function renderAssignment() {
  assignmentRound.textContent = `Round ${currentRound}`;
  renderFinalisationGuidance();
  renderFinalPersonalSyncGuidance();

  if (!selectedMember) {
    assignmentMessage.textContent = "Select a member to view their assignment.";
    assignmentMessage.classList.remove("no-assignment");
    assignmentMember.textContent = "—";
    assignmentClass.textContent = "—";
    assignmentMethod.textContent = "—";
    assignmentSource.textContent = "—";
    assignmentTest.textContent = "—";
    assignmentBranch.textContent = "—";
    setFeatureStepsDisabled(false);
    renderWorkflowGuidance(null);
    return;
  }

  const assignment = ASSIGNMENT_DATA.rounds[currentRound][selectedMember];
  assignmentMember.textContent = assignment.member;

  if (!assignment.method) {
    assignmentMessage.textContent = "No method assigned this round.";
    assignmentMessage.classList.add("no-assignment");
    assignmentClass.textContent = "—";
    assignmentMethod.textContent = "No method assigned";
    assignmentSource.textContent = "—";
    assignmentTest.textContent = "—";
    assignmentBranch.textContent = "—";
    setFeatureStepsDisabled(true);
    renderWorkflowGuidance(assignment);
    return;
  }

  const classFiles = ASSIGNMENT_DATA.classes[assignment.className];
  assignmentMessage.textContent = "Assigned feature for this round.";
  assignmentMessage.classList.remove("no-assignment");
  assignmentClass.textContent = assignment.className;
  assignmentMethod.textContent = assignment.method;
  assignmentSource.textContent = classFiles.sourceFile;
  assignmentTest.textContent = classFiles.testFile;
  assignmentBranch.textContent = assignment.branch;
  setFeatureStepsDisabled(false);
  renderWorkflowGuidance(assignment);
}

function showView(viewName) {
  const isSetup = viewName === "setup";
  setupView.classList.toggle("hidden", !isSetup);
  roundView.classList.toggle("hidden", isSetup);

  navigationButtons.forEach((button) => {
    const isActive = button.dataset.view === viewName;
    button.classList.toggle("active", isActive);

    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  if (!isSetup) {
    const roundNumber = viewName.slice(-1);
    currentRound = Number(roundNumber);
    roundTitle.textContent = `Round ${roundNumber}`;
    roundBadge.textContent = `0${roundNumber}`;
    updateRoundContext();
    renderAssignment();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

memberButtons.forEach((button) => {
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => selectMember(button.dataset.member));
});

studentRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      selectMember(radio.value);
    }
  });
});

navigationButtons.forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.view));
});

document.querySelectorAll('input[name="os"]').forEach((radio) => {
  radio.addEventListener("change", renderAssignment);
});

featureWorkflowSteps.forEach((step) => {
  step.querySelector("summary").addEventListener("click", (event) => {
    if (step.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
    }
  });
});

workflowCopyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);

    try {
      await navigator.clipboard.writeText(target.textContent);
      const originalLabel = button.textContent;
      button.textContent = "Copied ✓";

      setTimeout(() => {
        button.textContent = originalLabel;
      }, 1500);
    } catch (error) {
      console.error("Unable to copy workflow content:", error);
      alert("Couldn't copy automatically. Select the content manually.");
    }
  });
});

updateResolvedTargets();
renderAssignment();
