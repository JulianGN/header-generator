document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const captureArea = document.getElementById("hg-header-area");

  const headerTitle = document.getElementById("hg-header-title-main");
  const headerSub = document.getElementById("hg-header-title-sub");

  const logoSerasa = document.getElementById("hg-header-serasa-logo");

  const boxContainer = document.getElementById("hg-header-box");
  const headerBoxName = document.getElementById("hg-box-nome");
  const headerBoxDatetime = document.getElementById("hg-box-data-hora");
  const headerBoxKey = document.getElementById("hg-box-chave");

  // Inputs
  const titleInput = document.getElementById("hg-actions-title");
  const subtitleInput = document.getElementById("hg-actions-sub");
  const logoSerasaCheckbox = document.getElementById("hg-actions-logo-serasa");
  const logoFenyxEsquerdaCheckbox = document.getElementById(
    "hg-actions-logo-left"
  );
  const textAlignRadio = document.getElementsByName(
    "hg-actions-alinhamento-texto"
  );
  const boxCheckbox = document.getElementById("hg-actions-box");
  const boxOptionsContainer = document.getElementById(
    "hg-actions-box-options-container"
  );
  const nomeInput = document.getElementById("hg-actions-box-nome");
  const dateInput = document.getElementById("hg-actions-box-date");
  const chaveInput = document.getElementById("hg-actions-box-chave");
  const downloadBtn = document.getElementById(
    "header-generator-action-download-image"
  );

  function handleTitleChange() {
    headerTitle.innerText = titleInput.value;
  }

  function handleSubtitleChange() {
    const text = subtitleInput.value;
    headerSub.innerText = text;
    headerSub.style.display = text ? "block" : "none";
  }

  function handleDisableLogoFenyxEsquerdaCheckbox(logoSerasa) {
    if (logoSerasa) {
      logoFenyxEsquerdaCheckbox.setAttribute("disabled", !logoSerasa);
      logoFenyxEsquerdaCheckbox.checked = true;
      handleLogoFenyxEsquerdaCheckboxChange();
      captureArea.classList.add("header-print--logo-right");
    } else {
      logoFenyxEsquerdaCheckbox.removeAttribute("disabled");
      captureArea.classList.remove("header-print--logo-right");
    }
  }

  function handleLogoSerasaCheckboxChange() {
    const isChecked = logoSerasaCheckbox.checked;
    logoSerasa.style.display = isChecked ? "block" : "none";
    handleDisableLogoFenyxEsquerdaCheckbox(isChecked);
  }

  function handleLogoFenyxEsquerdaCheckboxChange() {
    const isChecked = logoFenyxEsquerdaCheckbox.checked;

    if (isChecked) {
      captureArea.classList.add("header-print--logo-left");
      captureArea.classList.remove("header-print--logo-right");
    } else {
      captureArea.classList.remove("header-print--logo-left");
      captureArea.classList.add("header-print--logo-right");
    }
  }

  function handleTextAlignRadioChange() {
    const selectedOption = document.querySelector(
      'input[name="hg-actions-alinhamento-texto"]:checked'
    );

    if (!selectedOption) {
      const inputCenter = document.getElementById(
        "hg-actions-alinhamento-texto-center"
      );

      if (inputCenter) inputCenter.checked = true;
      handleTextAlignRadioChange();
      return;
    }

    captureArea.classList.remove("header-print--text-left");
    captureArea.classList.remove("header-print--text-center");
    captureArea.classList.remove("header-print--text-right");
    captureArea.classList.add("header-print--text-" + selectedOption.value);
  }

  function cleanBoxContent() {
    headerBoxName.innerText = "";
    headerBoxDatetime.innerText = "";
    headerBoxKey.innerText = "";

    nomeInput.value = "";
    dateInput.value = "";
    chaveInput.value = "";
  }

  function handleBoxCheckboxChange() {
    const isChecked = boxCheckbox.checked;
    boxContainer.style.display = isChecked ? "block" : "none";
    boxOptionsContainer.style.display = isChecked ? "block" : "none";

    if (!isChecked) cleanBoxContent();
  }

  function handleNomeChange() {
    headerBoxName.innerText = nomeInput.value;
  }

  function handleDateChange() {
    const date = new Date(dateInput.value);

    const formattedDate = date.toLocaleDateString("pt-BR");

    const formattedTime = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    headerBoxDatetime.innerText = `${formattedDate} ${formattedTime}`;
  }

  function handleChaveChange() {
    headerBoxKey.innerText = chaveInput.value;
  }

  function handleDownload() {
    html2canvas(captureArea, {
      useCORS: true,
    }).then(function (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", 1.0);
      link.download = "header.jpg";
      link.click();
    });
  }

  // Event listeners
  titleInput.addEventListener("input", handleTitleChange);
  subtitleInput.addEventListener("input", handleSubtitleChange);
  logoSerasaCheckbox.addEventListener("change", handleLogoSerasaCheckboxChange);
  logoFenyxEsquerdaCheckbox.addEventListener(
    "change",
    handleLogoFenyxEsquerdaCheckboxChange
  );
  textAlignRadio.forEach((r) =>
    r.addEventListener("change", handleTextAlignRadioChange)
  );
  boxCheckbox.addEventListener("change", handleBoxCheckboxChange);
  nomeInput.addEventListener("input", handleNomeChange);
  dateInput.addEventListener("input", handleDateChange);
  chaveInput.addEventListener("input", handleChaveChange);
  downloadBtn.addEventListener("click", handleDownload);

  // onMounted
  handleLogoSerasaCheckboxChange();
  handleTextAlignRadioChange();
  handleBoxCheckboxChange();
  handleSubtitleChange();
});
