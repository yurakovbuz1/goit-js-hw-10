import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const delay = document.querySelector("[name='delay']");
const radios = document.querySelectorAll("[name='state']");
const button = document.querySelector("button");
button.addEventListener("click", onButtonClick);

function onButtonClick(e) {
    e.preventDefault();

    let decision = "";
    radios.forEach((elem) => {
        if (elem.checked) {
            decision = elem.value;
        }
    })
    console.log(decision);
    if (!delay.value) {
        iziToast.warning({ message: "Please, fill in the delay" });
    } else if (!decision) {
        iziToast.warning({ message: "Please, choose the state" });
    } else {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                if (decision === "fulfilled") {
                    resolve(delay.value);
                } else if (decision === "rejected") {
                    reject(delay.value);
                }
            }, delay.value);
        })
            .then((delay) => { iziToast.success({ message: `✅ Fulfilled promise in ${delay}ms` })})
            .catch((delay) => { iziToast.error({ message: `❌ Rejected promise in ${delay}ms` }) });
    }
}