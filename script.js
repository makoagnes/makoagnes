const minWidthForLargeView = 960

const whatToKeepAtEqualHeight = [
    { baseId: "promo", tolerance: 30 }
];



window.onload = function () {
    autoResize()
    autoAdjustNavBar()
};
window.onresize = function () {
    autoResize()
    autoAdjustNavBar()
    resetMenu()
};
window.onscroll = function () {
    scrollFunction()
};





function getNetWidth(element) {
    const computedStyle = getComputedStyle(element)
    return element.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight)
}
function getNetHeight(element) {
    const computedStyle = getComputedStyle(element)
    return element.clientHeight - parseFloat(computedStyle.paddingTop) - parseFloat(computedStyle.paddingBottom)
}





let btnJumpToTop = document.getElementById("jump-to-top");

function scrollFunction() {
    // When the user scrolls down 20px from the top of the document, show the button
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnJumpToTop.style.visibility = "visible";
        btnJumpToTop.style.opacity = 1;
    } else {
        btnJumpToTop.style.visibility = "hidden";
        btnJumpToTop.style.opacity = 0;
    }
}

// When the user clicks on the button, scroll to the top of the document
function jumpToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}







function autoResize() {
    for (const { baseId, tolerance } of whatToKeepAtEqualHeight) {
        resizeFunction(baseId, tolerance);
    }
};

function resizeFunction(baseId, tolerance = 0) {

    let img = document.getElementById(`${baseId}-img`);
    let text = document.getElementById(`${baseId}-text`);
    let paddingLeft = document.getElementById(`${baseId}-padding-left`);
    let paddingRight = document.getElementById(`${baseId}-padding-right`);

    const wL = getNetWidth(paddingLeft)
    const wR = getNetWidth(paddingRight)

    const [wA, hA] = [getNetWidth(img), getNetHeight(img)]
    const [wB, hB] = [getNetWidth(text), getNetHeight(text)]

    if (img && text) {
        if (document.body.clientWidth >= minWidthForLargeView) {
            if (hB > hA + tolerance) {

                const wP = wL + wR

                const factor = Math.min(hB / hA, 1 + (wP / wB))

                const wB_ = Math.floor(factor * wB)
                const hB_ = Math.floor(hB / factor)

                const wL_ = Math.floor(wL - (factor - 1) * wB / 2)
                const wR_ = Math.floor(wR - (factor - 1) * wB / 2)

                text.style.width = `${wB_}px`
                text.style.height = `${hB_}px`
                paddingLeft.style.width = `${wL_}px`
                paddingRight.style.width = `${wR_}px`
            }
        } else {
            text.style.width = ''
            text.style.height = ''
            paddingLeft.style.width = ''
            paddingRight.style.width = ''
        }
    }
}






function resetMenu() {
    document.getElementById("menu-container").classList.add("when-large");
    document.getElementById("menu-icon").classList.remove("change");
}

function toggleMenu() {
    document.getElementById("menu-container").classList.toggle("when-large");
    document.getElementById("menu-icon").classList.toggle("change");
}





function autoAdjustNavBar() {
    const navbar = document.getElementById("menu-container");
    const container = document.getElementById("main-content-container");
    const padding = document.body.clientWidth >= minWidthForLargeView ? 25 : 10;
    container.style.paddingTop = `${navbar.clientHeight + padding}px`
}






const coll = document.getElementsByClassName("collapsible-toggler");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const content = this.previousElementSibling;
        if (content.style.display === "grid") {
            content.style.display = "none";
        } else {
            content.style.display = "grid";
        }
    });
}