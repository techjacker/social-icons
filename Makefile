MOD_NAME = footer

## DOCS
DOCS_TMPL_DIR = docs-tmpl
MOCHA_MD_DOCS = README_footer.md

## Build
TMPL_DIR = tmpl
TMPL_CONVERT_CMD = minstache <
BUILD_DIR = build
BUILD_COMPILED = $(BUILD_DIR)/$(MOD_NAME).js
BUILD_COMPILED_MIN = $(BUILD_COMPILED:.js=.min.js)
BUILD_COMPILED_STANDALONE = $(BUILD_COMPILED:.js=.standalone.js)
BUILD_COMPILED_CSS = $(BUILD_COMPILED:.js=.css)

## install
COMPONENTJS_CMD = @component build --out $(@D) --name $(basename $(@F))

######################################
# Release
######################################
publish: build docs lint

docs: build
	@grunt build
	@make clean-readme

lint:
	@./node_modules/.bin/jshint lib

######################################
# Servers
######################################
server: build-quick
	@serve build
	@echo go to http://localhost:3000

######################################
# Build
######################################
# BUILD_DEPS = templates $(BUILD_COMPILED_MIN)
BUILD_DEPS = $(BUILD_COMPILED_CSS)

build: clean components npm-install-dev $(BUILD_DEPS)
build-quick: clean-build $(BUILD_DEPS)

$(BUILD_COMPILED_MIN): $(BUILD_COMPILED)
	@./node_modules/.bin/uglifyjs < $^ > $@

$(BUILD_COMPILED) $(BUILD_COMPILED_CSS):
	$(COMPONENTJS_CMD) $(MOD_NAME)

$(BUILD_COMPILED_STANDALONE):
	$(COMPONENTJS_CMD) --standalone $(MOD_NAME)

############## templates ################
templates:
	@for tmpl in $(wildcard $(TMPL_DIR)/*.tmpl); do \
		$(TMPL_CONVERT_CMD) $$tmpl > $$tmpl.js; \
	done
############## packages ################
components: component.json
	@component install --dev

######################################
# Docs
# run grunt readme
######################################
readme: readme-footer
	@grunt readme-concat

readme-footer:
	@[ -d $(DOCS_TMPL_DIR) ] || mkdir $(DOCS_TMPL_DIR)
	@echo '' >> $(DOCS_TMPL_DIR)/$(MOCHA_MD_DOCS)
	@echo '## License' >> $(DOCS_TMPL_DIR)/$(MOCHA_MD_DOCS)

######################################
# Housekeeping
######################################
size: build
	@echo "$(BUILD_COMPILED): `wc -c $(BUILD_COMPILED) | sed 's/ .*//'`"
	@echo "$(BUILD_COMPILED_MIN): `gzip -c $(BUILD_COMPILED_MIN) | wc -c`"

clean: clean-readme clean-build
	@rm -f *.log*
	@rm -rf components

clean-build:
	@rm -rf build $(PUBLIC_DIR)/build.* $(TMPL_DIR)/*.js

clean-readme:
	@find $(DOCS_TMPL_DIR) -maxdepth 1 -type f ! -iname '*.tmpl' -delete

.PHONY: readme clean clean-* npm-install-dev release test test-* size server *-quick