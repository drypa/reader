/**
 * Created by Google Reader.
 * User: drypa
 * Date: Dec 5, 2010
 * Time: 5:09:26 PM
 * To change this template use File | Settings | File Templates.
 */

dojo.provide('googlereader.MyItem');
dojo.require('dijit.layout._LayoutWidget');
dojo.require('dijit._Templated');
(function() {
    dojo.declare('googlereader.MyItem', [dijit.layout._LayoutWidget,dijit._Templated], {
        itemDataUrl: "",
        title: "",
        id: "",
        shown: false,
        textCache:"",
        templateString: dojo.cache("googlereader", "templates/MyItem.html"),
        constructor: function(args) {
            this.title = args.article.title;
            this.id = args.article.id;
            this.itemDataUrl = args.url;
        },
        postCreate: function() {
            this.connect(this, 'onClick', this.clicked);
            this.inherited(arguments);
        },
        clicked: function() {
            if (this.shown) {
                this.hideContent();
            } else {
                this.showContent();
            }
        },
        loading:function(state) {
            dojo.style(this.loadingImage, 'display', state ? 'block' : 'none');

        },
        showContent: function() {
            if (this.textCache == "") {
                this.loading(true);
                dojo.xhrGet({
                    url: this.itemDataUrl,
                    handleAs: "json",
                    content: {id: this.id},
                    load: dojo.hitch(this, function(responseObject) {
                        this.showText(responseObject.article.text);
                        this.loading(false);
                    })
                });
            }
            else {
                this.showText(this.textCache);
            }
        },
        showText: function(text) {
            this.textPlace.innerHTML = text;
            this.shown = true;
            this.textCache = text;
        },
        hideContent: function() {
            this.textPlace.innerHTML = "";
            this.shown = false;
        }

    })
})();