// tabs https://codepen.io/rafaelavlucas/pen/MLKGba?editors=1010

let tabLinks = document.querySelectorAll(".tab-links"),
    tabContent = document.querySelectorAll(".tab-pane");


Array.prototype.forEach.call(tabLinks,function (el) {
    el.addEventListener("click", openTabs);
});


function openTabs(el) {
    let btnTarget = el.currentTarget,
        idTab = btnTarget.dataset.tab;

    Array.prototype.forEach.call(tabContent,function (el) {
        el.classList.remove("active");
    });

    Array.prototype.forEach.call(tabLinks,function (el) {
        el.classList.remove("active");
    });

    document.querySelector("#" + idTab).classList.add("active");

    btnTarget.classList.add("active");
}
