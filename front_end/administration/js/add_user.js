var option_nodes = document.getElementById("select").children

document.getElementById("select").addEventListener("click", () => {
    this.option_nodes[1].removeAttribute("hidden")
    this.option_nodes[2].removeAttribute("hidden")
    this.option_nodes[3].removeAttribute("hidden")
})