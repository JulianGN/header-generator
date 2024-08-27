document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const headerTitle = document.getElementById("hg-header-title-main");
  const headerSub = document.getElementById("hg-header-title-sub");

  const boxContainer = document.getElementById("hg-header-box");
  const headerBoxName = document.getElementById("hg-box-nome");
  const headerBoxDatetime = document.getElementById("hg-box-data-hora");
  const headerBoxKey = document.getElementById("hg-box-chave");

  const titleInput = document.getElementById("hg-actions-title");
  const subtitleInput = document.getElementById("hg-actions-sub");
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
    const captureArea = document.getElementById("hg-header-area");
    html2canvas(captureArea).then(function (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg");
      link.download = "header.jpg";
      link.click();
    });
  }

  // Event listeners
  titleInput.addEventListener("input", handleTitleChange);
  subtitleInput.addEventListener("input", handleSubtitleChange);
  boxCheckbox.addEventListener("change", handleBoxCheckboxChange);
  nomeInput.addEventListener("input", handleNomeChange);
  dateInput.addEventListener("input", handleDateChange);
  chaveInput.addEventListener("input", handleChaveChange);
  downloadBtn.addEventListener("click", handleDownload);

  // onMounted
  handleBoxCheckboxChange();
  handleSubtitleChange();
});
