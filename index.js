/* jshint node: true */
/* global document: false */
'use strict';

var eve = require('eve');
var reDelim = /[\.\/]/;
var reTrailingDelim = /[\.\/]$/;

/**
  # actionman

  The `actionman` module is works in conjuction with
  [eve](https://github.com/adobe-webplatform/eve) to automatically wire
  dom events into eve.

  ## Usage

  The first thing that is required is to ensure `actionman` is initialized
  once the `document` (the default scope) is available.

  This is a simple call and it's recommended that you provide a namespace
  (first argument) when initializing actionman so you can discern your
  application events from other components which might also be using
  actionman:

  <<< examples/simple/index.js

  The accompanying HTML for this example might look something like:

  <<< examples/simple/index.html

  By default only `click` events are automatically wired in, but this
  can be confired by passing some additional opts to actionman.

  ## Reference

  ### actionman(namespace?, opts?)

  Automatically wire the event types specified in `opts.types`
  (default: `['click']`) to the specified `opts.scope`
  (default: `document`) into eve.

  Using a namespace is encouraged, but not required.  If no namespace
  is specified then eve will trigger events with the names outlined as
  defined on the `data-action` attribute.

**/
module.exports = function(namespace, opts) {
  var eventTypes = [].concat((opts || {}).types || ['click']);
  var useDataset = typeof document.dataset != 'undefined';
  var handlers = [];
  var scope = (opts || {}).scope || document;

  // convert the namespace to a namespace array
  namespace = (namespace || '').replace(reTrailingDelim, '');

  // split if the namespace is not empty, otherwise set to an empty array
  namespace = namespace ? namespace.split(reDelim) : [];

  function bind() {
    // iterate through the event types and bind handlers
    eventTypes.forEach(function(type, index) {
      // bind a document level listener
      scope.addEventListener(type, handlers[index] = function(evt) {
        // get the action from the event target
        var action = useDataset ?
          evt.target.dataset.action :
          evt.target.getAttribute('data-action');

        // if we don't have an action, bail
        if (! action) {
          return;
        }

        // namespace and event type the action
        action = namespace.concat(action, type);

        // trigger the action passing on the original event
        eve(action.join('.'), evt.target, evt, type);
      });
    }, (opts || {}).capture);
  }

  function unbind() {
    eventTypes.forEach(function(type, index) {
      scope.removeEventListener(type, handlers[index]);
    });
  }

  // bind automatically
  bind();

  return {
    bind: bind,
    unbind: unbind
  };
};