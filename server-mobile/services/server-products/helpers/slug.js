function slug(name) {
    return name.split(" ").join("-").toLocaleLowerCase()
}

module.exports = { slug }