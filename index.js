document.addEventListener("DOMContentLoaded", () => {
  const memoInput = document.getElementById("memoInput");
  const saveMemoButton = document.getElementById("saveMemo");
  const memoList = document.getElementById("memoList");

  // ローカルストレージからメモを読み込む
  loadMemos();

  saveMemoButton.addEventListener("click", () => {
    const memoText = memoInput.value.trim();
    if (memoText) {
      addMemo(memoText);
      memoInput.value = "";
      saveMemos();
    }
  });

  function addMemo(text) {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
            <span>${text}</span>
            <button class="btn btn-danger btn-sm delete-memo">削除</button>
        `;
    li.querySelector(".delete-memo").addEventListener("click", () => {
      li.remove();
      saveMemos();
    });
    memoList.appendChild(li);
  }

  function saveMemos() {
    const memos = Array.from(memoList.children).map(
      (li) => li.querySelector("span").textContent
    );
    localStorage.setItem("memos", JSON.stringify(memos));
  }

  function loadMemos() {
    const memos = JSON.parse(localStorage.getItem("memos")) || [];
    memos.forEach((memo) => addMemo(memo));
  }
});
