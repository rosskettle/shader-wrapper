
StringLineArray = function(str, indent) {
	var padding = String.fromCharCode(32);
	for (var i = 0; i < indent; i++) {
	  padding += padding;
	}
	str = padding + "[\n" + padding + "'" + str.trim().replace(/(\r\n|\n|\r)/gm,"',\n" + padding + "'") + "'\n" + padding + "]";
	str = str.replace(/'',/g,"")
	return str
}

module.exports = StringLineArray;