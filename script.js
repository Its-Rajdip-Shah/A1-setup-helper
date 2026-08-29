const form = document.getElementById("setupForm");

const unikeyInput = document.getElementById("unikey");

const emailInput = document.getElementById("email");

const repoName = document.getElementById("repoName");

const unikeyError = document.getElementById("unikeyError");

const outputSection = document.getElementById("outputSection");

const commandOutput = document.getElementById("commandOutput");

const copyButton = document.getElementById("copyButton");

const terminalType = document.getElementById("terminalType");

const TEAM_REPO = "A1-T27-43-IM";

const IM_FOLDER = "im-A1-T27-43";

const ORG = "SOFT2412-COMP9412-2026s2";

const HOST = "github.sydney.edu.au";

function cleanUnikey(value) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function validUnikey(unikey) {
  return /^[a-z]{4}\d{4}$/.test(unikey);
}

unikeyInput.addEventListener("input", () => {
  const clean = cleanUnikey(unikeyInput.value);

  if (unikeyInput.value !== clean) {
    unikeyInput.value = clean;
  }

  if (!clean) {
    repoName.textContent = "A1-T27-43-<unikey>";

    emailInput.value = "";

    unikeyError.textContent = "";

    return;
  }

  repoName.textContent = `A1-T27-43-${clean}`;

  emailInput.value = `${clean}@uni.sydney.edu.au`;

  if (!validUnikey(clean)) {
    unikeyError.textContent =
      "UniKey must be exactly 4 letters followed by 4 digits.";
  } else {
    unikeyError.textContent = "";
  }
});

function bashCommands(name, unikey) {
  const personalRepo = `A1-T27-43-${unikey}`;

  const teamUrl = `git@${HOST}:${ORG}/${TEAM_REPO}.git`;

  const personalUrl = `git@${HOST}:${ORG}/${personalRepo}.git`;

  const email = `${unikey}@uni.sydney.edu.au`;

  return `set -e

echo "Checking Git..."

if ! command -v git >/dev/null 2>&1; then
  echo "ERROR: Git is not installed."
  exit 1
fi

echo "Git found."

echo ""
echo "Checking access to the team repository..."

if ! git ls-remote "${teamUrl}" >/dev/null 2>&1; then
  echo "ERROR: Cannot access the team repository."
  echo "Check your USYD GitHub Enterprise SSH access."
  exit 1
fi

echo "Team repository reachable."

echo ""
echo "Checking your personal repository..."

if ! git ls-remote "${personalUrl}" >/dev/null 2>&1; then
  echo "ERROR: Cannot access your personal repository:"
  echo "${personalRepo}"
  echo ""
  echo "Make sure:"
  echo "1. You created it on GitHub Enterprise."
  echo "2. The name is exactly ${personalRepo}"
  echo "3. It is inside ${ORG}"
  echo "4. Your SSH access works."
  exit 1
fi

echo "Personal repository reachable."

echo ""
echo "Checking local folders..."

if [ -e "${personalRepo}" ]; then
  echo "ERROR: ${personalRepo} already exists in this folder."
  exit 1
fi

if [ -e "${IM_FOLDER}" ]; then
  echo "ERROR: ${IM_FOLDER} already exists in this folder."
  exit 1
fi

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

git clone "${teamUrl}" "${IM_FOLDER}"

cd "${IM_FOLDER}"

git remote add me "${personalUrl}"

git config --local user.name "${name}"
git config --local user.email "${email}"

echo ""
echo "Integration Manager repository configured."

cd "../${personalRepo}"

git fetch upstream
git merge upstream/master

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

cd "../${IM_FOLDER}"

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
echo "${IM_FOLDER}"`;
}

function powershellCommands(name, unikey) {
  const personalRepo = `A1-T27-43-${unikey}`;

  const teamUrl = `git@${HOST}:${ORG}/${TEAM_REPO}.git`;

  const personalUrl = `git@${HOST}:${ORG}/${personalRepo}.git`;

  const email = `${unikey}@uni.sydney.edu.au`;

  return `$ErrorActionPreference = "Stop"

Write-Host "Checking Git..."

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Git is not installed."
    exit 1
}

Write-Host "Git found."

Write-Host ""
Write-Host "Checking access to the team repository..."

git ls-remote "${teamUrl}" *> $null

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Cannot access the team repository."
    Write-Host "Check your USYD GitHub Enterprise SSH access."
    exit 1
}

Write-Host "Team repository reachable."

Write-Host ""
Write-Host "Checking your personal repository..."

git ls-remote "${personalUrl}" *> $null

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Cannot access your personal repository:"
    Write-Host "${personalRepo}"

    Write-Host ""
    Write-Host "Make sure:"
    Write-Host "1. You created it on GitHub Enterprise."
    Write-Host "2. The name is exactly ${personalRepo}"
    Write-Host "3. It is inside ${ORG}"
    Write-Host "4. Your SSH access works."

    exit 1
}

Write-Host "Personal repository reachable."

Write-Host ""
Write-Host "Checking local folders..."

if (Test-Path "${personalRepo}") {
    Write-Host "ERROR: ${personalRepo} already exists in this folder."
    exit 1
}

if (Test-Path "${IM_FOLDER}") {
    Write-Host "ERROR: ${IM_FOLDER} already exists in this folder."
    exit 1
}

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

git clone "${teamUrl}" "${IM_FOLDER}"

Set-Location "${IM_FOLDER}"

git remote add me "${personalUrl}"

git config --local user.name "${name}"
git config --local user.email "${email}"

Write-Host ""
Write-Host "Integration Manager repository configured."

Set-Location "../${personalRepo}"

git fetch upstream
git merge upstream/master

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

Set-Location "../${IM_FOLDER}"

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
Write-Host "${IM_FOLDER}"`;
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

  let commands;

  if (os === "windows") {
    commands = powershellCommands(name, unikey);

    terminalType.textContent = "Windows · PowerShell";
  } else {
    commands = bashCommands(name, unikey);

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
