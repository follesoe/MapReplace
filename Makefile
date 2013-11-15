all: clean bundle
bundle: clean
	@cp -R _locales/no/ _locales/nb
	@zip -r MapReplace.zip * -x=*.git* -x=*.sh* -x=*docs* -x=*.DS_Store* -x=*Makefile* -x=*.gitignore*
	@echo "Generated extension file MapReplace.zip"

clean:
	@rm -rf _locales/nb
	@rm -f MapReplace.zip
.PHONY: bundle