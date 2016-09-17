html=src/html
header=$(html)/header.html
body=$(html)/body.html
footer=$(html)/footer.html
js=src/js/index.js
css=src/css/index.css
out=public/index.html

$(out): $(header) $(body) $(footer) $(js) $(css)
	@echo "🚔"
	@cat $(header)  > $(out)
	@cat $(css)    >> $(out)
	@cat $(body)   >> $(out)
	@cat $(js)     >> $(out)
	@cat $(footer) >> $(out)
	@echo "😎"
