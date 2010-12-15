/**
 * Created by Google Reader.
 * User: drypa
 * Date: Dec 5, 2010
 * Time: 5:09:26 PM
 * To change this template use File | Settings | File Templates.
 */

dojo.provide('googlereader.MyReader');
dojo.require('dijit.layout._LayoutWidget');
dojo.require('googlereader.MyItem');
(function() {
    dojo.declare('googlereader.MyReader', [dijit.layout._LayoutWidget,dijit._Templated], {
        dataUrl: "",
        readerName: "",
        itemDataUrl: "",
        limit: 10,
        offset: 0,
        totalCount: 0,
        id: "reader",
        scrollDelta: 0.9,
        isLoading: false,
        templateString: dojo.cache('googlereader', 'templates/MyReader.html'),
        postCreate: function() {
            console.log("postCreate: " + this.dataUrl);
            this.loadTitles();
            this.connectEventHandler();
            this.inherited(arguments);
        },
        loadTitles: function() {
            if (!this.isLoading) {
                this.loading(true);
                dojo.xhrGet({
                    url: this.dataUrl,
                    handleAs: "json",
                    content:{limit: this.limit, offset:this.offset},
                    load: dojo.hitch(this, function(responseObject) {
                        this.changeTotalCount(responseObject.count);
                        this.insertArticles(responseObject.article);
                        this.loading(false);
                        this.changeOffset(responseObject.article.length);
                    })
                });
            }
        },
        insertArticles:function(articles) {
            dojo.forEach(articles, function(item) {
                var widget = new googlereader.MyItem({article: item.article,url:this.itemDataUrl});
                widget.placeAt(this.contentPlace);

            }, this);
        },
        changeTotalCount:function(count) {
            this.countPlace.innerHTML = count;
            this.totalCount = count;
        },
        changeOffset:function(offset) {
            this.offset += offset;
            this.countLoadedPlace.innerHTML = this.offset;
        },
        needLoad:function() {
            return (this.readerDomNode.offsetHeight + this.readerDomNode.scrollTop >=
                    this.readerDomNode.scrollHeight * this.scrollDelta);
        },
        connectEventHandler:function() {
            dojo.connect(this.domNode, (dojo.isMozilla ? "DOMMouseScroll" : "onmousewheel" ), this, function(e) {
                if (this.needLoad()) {
                    this.loadTitles();
                }
            });
        },
        loading:function(state) {
            this.isLoading = state;
            dojo.style(this.loadingImage, 'display', state ? 'block' : 'none');

        }
    })
})();