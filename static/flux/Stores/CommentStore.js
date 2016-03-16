/**
 * Created by katakonst on 3/13/16.
 */
/**
 * Created by katakonst on 3/13/16.
 */

var CHANGE_EVENT = 'change';

var  comments = {}
var id=0;
var section;


function  addComment(text,user,trackId)
 {
     $.getJSON( "/addComment?text="+encodeURIComponent(text)+"&userid="+encodeURIComponent(user)+"&trackId="+encodeURIComponent(trackId), function( data ) {
         CommentStore.emitList();
     });
 };

function  listComments(trackId,sectionTracks)
{
     $.getJSON( "/getComments?trackId="+encodeURIComponent(trackId), function( data ) {
         id=trackId;

         section=sectionTracks;
         comments=data;
         CommentStore.emitList();
     });
}

!function(r){"use strict";function t(){}function n(n,e){if(i)return e.indexOf(n);for(var t=e.length;t--;)if(e[t]===n)return t;return-1}var e=t.prototype,i=Array.prototype.indexOf?!0:!1;e._getEvents=function(){return this._events||(this._events={})},e.getListeners=function(n){var r,e,t=this._getEvents();if("object"==typeof n){r={};for(e in t)t.hasOwnProperty(e)&&n.test(e)&&(r[e]=t[e])}else r=t[n]||(t[n]=[]);return r},e.getListenersAsObject=function(n){var e,t=this.getListeners(n);return t instanceof Array&&(e={},e[n]=t),e||t},e.addListener=function(i,r){var e,t=this.getListenersAsObject(i);for(e in t)t.hasOwnProperty(e)&&-1===n(r,t[e])&&t[e].push(r);return this},e.on=e.addListener,e.defineEvent=function(e){return this.getListeners(e),this},e.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},e.removeListener=function(i,s){var r,e,t=this.getListenersAsObject(i);for(e in t)t.hasOwnProperty(e)&&(r=n(s,t[e]),-1!==r&&t[e].splice(r,1));return this},e.off=e.removeListener,e.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},e.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},e.manipulateListeners=function(r,t,i){var e,n,s=r?this.removeListener:this.addListener,o=r?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(e=i.length;e--;)s.call(this,t,i[e]);else for(e in t)t.hasOwnProperty(e)&&(n=t[e])&&("function"==typeof n?s.call(this,e,n):o.call(this,e,n));return this},e.removeEvent=function(n){var e,r=typeof n,t=this._getEvents();if("string"===r)delete t[n];else if("object"===r)for(e in t)t.hasOwnProperty(e)&&n.test(e)&&delete t[e];else delete this._events;return this},e.emitEvent=function(r,i){var n,e,s,t=this.getListenersAsObject(r);for(e in t)if(t.hasOwnProperty(e))for(n=t[e].length;n--;)s=i?t[e][n].apply(null,i):t[e][n](),s===!0&&this.removeListener(r,t[e][n]);return this},e.trigger=e.emitEvent,e.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},"function"==typeof define&&define.amd?define(function(){return t}):r.EventEmitter=t}(this);

var ADD_EVENT = 'addEvent';
var LIST_EVENT = 'listEvent';

var CommentStore = Object.assign({}, EventEmitter.prototype, {
    emitAdd: function() {
    this.emit(ADD_EVENT)
   },
    emitList: function() {
    this.emit(LIST_EVENT)
   },
    addAddCommentListener: function(callback) {
    this.addListener(ADD_EVENT,callback);
   },
    removeAddCommentListener: function(callback) {
    this.removeListener(ADD_EVENT, callback);
   },
    addListCommentsListener: function(callback) {
    this.addListener(LIST_EVENT,callback);
   },
    removeListCommentsListener: function(callback) {
    this.removeListener(LIST_EVENT, callback);
   },
    getComments: function() {
    return comments;
  },
    getId: function() {
    return id;
  },
    getSection: function() {
    return section;
  }
   });


AppDispatcher.register(function(action) {
  var text;
    switch(action.actionType) {
    case ActionTypes.addComents:
      text = action.text;
        var user = action.user;
        var trackId = action.trackId;
        if (text !== '') {
        addComment(text,user,trackId);
      }
      break;
       case ActionTypes.listComments:
           var trackId = action.trackId;
           if (trackId !== '') {
        listComments(trackId,action.section);
      }
      break;
        default:
  }
});

window.MatchStore = MatchStore;
