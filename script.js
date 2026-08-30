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
  },
};

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
        productionInstruction: "Replace showExchangeRates() in UserInterface.java.",
        productionSnippet: `public void showExchangeRates() {
    System.out.println("=== Exchange Rates ===");
    String[] currencies = converter.getSupportedCurrencies();

    for (String fromCurrency : currencies) {
        for (String toCurrency : currencies) {
            double rate = converter.getExchangeRate(fromCurrency, toCurrency);
            double displayRate = converter.roundToTwoDecimals(rate);
            System.out.printf("%s -> %s: %.2f%n",
                    fromCurrency, toCurrency, displayRate);
        }
    }
}`,
        testInstruction: "Replace testShowExchangeRates() in UserInterfaceTest.java. No additional imports are required because the snippet uses fully qualified java.io and JUnit class names.",
        testMethods: ["testShowExchangeRates"],
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

    String text = output.toString();
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("=== Exchange Rates ==="));
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("USD -> EUR: 0.85"));
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("EUR -> USD: 1.18"));
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("AUD -> AUD: 1.00"));
}`,
        shortDescription: "displays all supported exchange-rate pairs",
        changelog: "- showExchangeRates(): displays all supported exchange-rate pairs -- Raj Shah",
        commitSubject: "Display exchange-rate table",
        commitBody: "Implement showExchangeRates with deterministic two-decimal output and replace its console-output test.",
      },
      "Tiya Agrawal": {
        member: "Tiya", className: "UserInterface", method: "handleConversion", branch: "feature/handle-conversion",
        productionInstruction: "Replace handleConversion() in UserInterface.java.",
        productionSnippet: `public void handleConversion() {
    System.out.print("Enter amount: ");
    String amountInput = scanner.nextLine();
    if (!validator.isValidAmount(amountInput)) {
        System.out.println("Invalid amount.");
        return;
    }

    System.out.print("Enter source currency: ");
    String fromCurrency = validator.normalizeCurrency(scanner.nextLine());
    if (!validator.isValidCurrency(fromCurrency)) {
        System.out.println("Invalid source currency.");
        return;
    }

    System.out.print("Enter target currency: ");
    String toCurrency = validator.normalizeCurrency(scanner.nextLine());
    if (!validator.isValidCurrency(toCurrency)) {
        System.out.println("Invalid target currency.");
        return;
    }

    double amount = validator.parseAmount(amountInput);
    double converted = converter.convert(amount, fromCurrency, toCurrency);
    double displayAmount = converter.roundToTwoDecimals(converted);
    System.out.printf("%.2f %s = %.2f %s%n",
            amount, fromCurrency, displayAmount, toCurrency);
}`,
        testInstruction: "Replace testHandleConversion() in UserInterfaceTest.java. System.in is replaced before UserInterface construction and both System.in/System.out are restored. No additional imports are required.",
        testMethods: ["testHandleConversion"],
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
            output.toString().contains("100.00 USD = 85.00 EUR"));
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
        testInstruction: "The existing normalizeCurrency assertions in DataValidatorTest.java already exercise lowercase, mixed-case, and surrounding whitespace. No test replacement or additional import is required.",
        testMethods: [],
        testReference: "Existing normalizeCurrency assertions: usd -> USD, spaced eur -> EUR, and Gbp -> GBP.",
        testSnippet: "",
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
        testInstruction: "The existing parseAmount assertions in DataValidatorTest.java already exercise valid integers, valid decimals, and invalid text returning 0.0. No test replacement or additional import is required.",
        testMethods: [],
        testReference: "Existing parseAmount assertions: 100 -> 100.0, 50.75 -> 50.75, and invalid -> 0.0.",
        testSnippet: "",
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
    System.out.println("=== Currency Converter ===");

    boolean running = true;
    while (running) {
        showMenu();
        System.out.print("Choose an option: ");
        String choice = scanner.nextLine();

        switch (choice) {
            case "1" -> handleConversion();
            case "2" -> showExchangeRates();
            case "3" -> {
                System.out.println("Goodbye!");
                running = false;
            }
            default -> System.out.println("Invalid choice. Please try again.");
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
            "invalid\\n3\\n".getBytes(java.nio.charset.StandardCharsets.UTF_8));
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
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("1. Convert Currency"));
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("Invalid choice. Please try again."));
    org.junit.jupiter.api.Assertions.assertTrue(text.contains("Goodbye!"));
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
    tests: ["UserInterfaceTest.testHandleConversion"],
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
    $candidateJavac = Join-Path $candidate "bin\javac.exe"
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

function bashRepositoryStep({ folder, repositoryLabel, remotes, body, successVariable, nextStep }) {
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
    echo "READY FOR STEP ${nextStep}"
  fi
fi`;
}

function powershellRepositoryStep({ folder, repositoryLabel, remotes, body, successVariable, nextStep }) {
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
  Write-Host "READY FOR STEP ${nextStep}"
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
        $entry = "${assignment.changelog}"
        $entryCount = @($originalChangelog -split "\\r?\\n" | Where-Object { $_ -ceq $entry }).Count
        if ($entryCount -gt 1) {
          Write-Host "STOP: The selected CHANGELOG entry already appears more than once. Team master was not pushed."
          $changelogReady = $false
        } elseif ($entryCount -eq 0) {
          $headingMatches = [regex]::Matches($originalChangelog, "(?m)^## Unreleased\\s*$")
          if ($headingMatches.Count -ne 1) {
            Write-Host "STOP: Expected exactly one ## Unreleased heading. CHANGELOG.md was not staged."
            $changelogReady = $false
          } else {
            $windowsNewline = ([string][char]13) + ([string][char]10)
            $newline = if ($originalChangelog.Contains($windowsNewline)) { $windowsNewline } else { [string][char]10 }
            $insertAt = $headingMatches[0].Index + $headingMatches[0].Length
            $expectedChangelog = $originalChangelog.Insert($insertAt, $newline + $entry)
            [IO.File]::WriteAllText((Resolve-Path "CHANGELOG.md"), $expectedChangelog, (New-Object Text.UTF8Encoding($false)))
          }
        } else {
          $expectedChangelog = $originalChangelog
        }
      }
      if ($changelogReady) {
        $resolvedChangelog = [IO.File]::ReadAllText((Resolve-Path "CHANGELOG.md"))
        $resolvedEntryCount = @($resolvedChangelog -split "\\r?\\n" | Where-Object { $_ -ceq $entry }).Count
        $hasMarkers = $resolvedChangelog -match "(?m)^(<<<<<<<|=======|>>>>>>>)"
        git rev-parse -q --verify MERGE_HEAD *> $null
        if ($LASTEXITCODE -ne 0 -or $hasMarkers -or $resolvedEntryCount -ne 1 -or $resolvedChangelog -cne $expectedChangelog) {
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
        Write-Host "CHANGELOG RESOLVED: preserved existing entries and added ${assignment.changelog}."
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
      changelog_entry='${assignment.changelog}'
      entry_was_present=false
      if [ "$changelog_ready" = true ]; then
        entry_count=$(grep -Fxc -- "$changelog_entry" CHANGELOG.md || true)
        if [ "$entry_count" -gt 1 ]; then
          echo "STOP: The selected CHANGELOG entry already appears more than once. Team master was not pushed."
          changelog_ready=false
        elif [ "$entry_count" -eq 0 ]; then
          heading_count=$(grep -c '^## Unreleased[[:space:]]*$' CHANGELOG.md || true)
          if [ "$heading_count" -ne 1 ]; then
            echo "STOP: Expected exactly one ## Unreleased heading. CHANGELOG.md was not staged."
            changelog_ready=false
          elif ! awk -v entry="$changelog_entry" '{ print; if ($0 ~ /^## Unreleased[[:space:]]*$/) print entry }' "$changelog_base" > "$changelog_expected"; then
            echo "STOP: Could not prepare the expected CHANGELOG.md. Team master was not pushed."
            changelog_ready=false
          elif ! mv "$changelog_expected" CHANGELOG.md; then
            echo "STOP: Could not update CHANGELOG.md. Team master was not pushed."
            changelog_ready=false
          fi
        else
          entry_was_present=true
          cp "$changelog_base" "$changelog_expected" || changelog_ready=false
        fi
      fi
      if [ "$changelog_ready" = true ]; then
        resolved_entry_count=$(grep -Fxc -- "$changelog_entry" CHANGELOG.md || true)
        if ! git rev-parse -q --verify MERGE_HEAD >/dev/null 2>&1 ||
            grep -Eq '^(<<<<<<<|=======|>>>>>>>)' CHANGELOG.md ||
            [ "$resolved_entry_count" -ne 1 ]; then
          echo "STOP: Automatic CHANGELOG verification failed. CHANGELOG.md was not staged and team master was not pushed."
          changelog_ready=false
        fi
      fi
      if [ "$changelog_ready" = true ] && [ "$entry_was_present" = false ]; then
        if ! awk '{ sub(/\\r$/, ""); print }' "$changelog_base" > "$changelog_base_lines" ||
            ! awk -v entry="$changelog_entry" 'BEGIN { removed = 0 } { sub(/\\r$/, ""); if (!removed && $0 == entry) { removed = 1; next } print }' CHANGELOG.md > "$changelog_resolved_lines" ||
            ! cmp -s "$changelog_base_lines" "$changelog_resolved_lines"; then
          echo "STOP: Existing team CHANGELOG lines or their order changed unexpectedly. CHANGELOG.md was not staged."
          changelog_ready=false
        fi
      elif [ "$changelog_ready" = true ]; then
        if ! awk '{ sub(/\\r$/, ""); print }' "$changelog_base" > "$changelog_base_lines" ||
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
        echo "CHANGELOG RESOLVED: preserved existing entries and added ${assignment.changelog}."
        if git commit --no-edit; then
          ${postMergeValidation}
        else
          echo "STOP: The automatic CHANGELOG merge commit failed. Team master was not pushed."
        fi
      fi
      rm -f "$changelog_base" "$changelog_expected" "$changelog_base_lines" "$changelog_resolved_lines"
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

  productionInstruction.textContent =
    `LOCATION SAFETY: Edit inside ${personalFolder} only, with branch ${assignment.branch} checked out. ` +
    `FILE: ${classFiles.sourceFile} · ${assignment.productionInstruction} ` +
    "Copy only this method; do not replace the whole Java file.";
  productionCodeLabel.textContent = `REPLACE METHOD · ${assignment.method}`;
  productionCode.textContent = assignment.productionSnippet;
  testFileNote.textContent =
    `LOCATION SAFETY: Edit inside ${personalFolder} only, with branch ${assignment.branch} checked out. ` +
    `FILE: ${classFiles.testFile} · ${assignment.testInstruction} ` +
    "Use this existing shared class-level test file only.";
  testCodeLabel.textContent = assignment.testMethods.length
    ? `REPLACE / ADD TEST METHOD(S) · ${assignment.testMethods.join(", ")}`
    : "EXISTING TEST ASSERTIONS";
  testCode.textContent = assignment.testSnippet;
  testCode.dataset.placeholder = assignment.testSnippet
    ? ""
    : `No test code change required. ${assignment.testReference}`;
  changelogLine.textContent = assignment.changelog;
  changelogInstruction.textContent =
    `LOCATION SAFETY: Edit CHANGELOG.md inside ${personalFolder} only, with branch ${assignment.branch} checked out. ` +
    "Add this exact line underneath ## Unreleased.";

  const commitPushBody = usesPowerShell
    ? `$stepSucceeded = $false
$currentBranch = (git branch --show-current).Trim()
if ($currentBranch -ne "${assignment.branch}") {
  Write-Host "STOP: Step 06 requires branch ${assignment.branch}; current branch is $currentBranch. Nothing was staged or committed."
} else {
  git status
  if ($LASTEXITCODE -eq 0) { git add ${classFiles.sourceFile} ${classFiles.testFile} CHANGELOG.md }
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
      git add ${classFiles.sourceFile} ${classFiles.testFile} CHANGELOG.md && \
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
