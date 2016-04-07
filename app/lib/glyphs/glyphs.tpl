<label>glyphs selector:
    <input
        type="text"
        ng-model="selector"
        />
</label>
<label>glyph size:
    <input type="range" min="0" max="1024" step="1" ng-model="glyphsize"/>
    {{ glyphsize || initialGlypsize }}px
</label>
<button
    ng-click="ctrl.toggleGlyphControls()"
    >{{ glyphControlsVisible ? 'Hide' : 'Show' }} Controls</button>

<ol>
    <li
        ng-repeat="glyph in ctrl.selectGlyphs(selector) track by glyph.nodeID">
        <mtk-glyph
            style="height:{{ glyphsize || initialGlypsize}}px"
            mtk-glyph-element="glyph"
            mtk-glyph-controls-visible="glyphControlsVisible"
            title="{{ glyph.particulars }}"
            ></mtk-glyph>
    </li>
</ol>
