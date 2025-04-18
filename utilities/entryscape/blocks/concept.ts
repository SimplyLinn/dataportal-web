/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entry } from "@entryscape/entrystore-js";
import { Translate } from "next-translate";

import { includeLangInPath } from "@/utilities/check-lang";
import {
  conceptsPathResolver,
  getLocalizedValue,
} from "@/utilities/entrystore/entrystore-helpers";

export const conceptBlocks = (t: Translate, iconSize: number, lang: string) => [
  {
    block: "broaderList",
    extends: "template",
    relation: "skos:broader",
    class: "entryscape",
    template: "{{conceptLink}}",
  },
  {
    block: "narrowerList",
    extends: "list",
    layout: "raw",
    rowhead: "{{conceptLink}}",
    relation: "skos:narrower",
    click: "./",
    class: "text-md link",
    limit: 20,
    content: "${skos:prefLabel}",
  },
  {
    block: "relatedList",
    extends: "list",
    layout: "raw",
    relation: "skos:related",
    click: "./",
    limit: 20,
    class: "text-md link",
    content: "${skos:prefLabel}",
    rowhead: "{{conceptLink}}",
  },
  {
    block: "conceptLink",
    run: function (node: any, a2: any, a3: any, entry: Entry) {
      if (node && node.firstElementChild && entry) {
        const baseUrl = window.location.origin;
        const el = document.createElement("a");

        node.setAttribute("class", "entryscape");

        node.firstElementChild.appendChild(el);

        const label = getLocalizedValue(
          entry.getAllMetadata(),
          "skos:prefLabel",
        );
        el.innerHTML = label;
        const uri = `${baseUrl}${includeLangInPath(lang)}${conceptsPathResolver(
          entry,
        )}`;
        el.setAttribute("href", uri);
      }
    },
    loadEntry: true,
  },
  {
    block: "conceptBlock",
    class: "conceptDetail",
    extends: "template",
    template:
      '{{#ifprop "skos:altLabel"}}' +
      "<div data-test-id='alternative-terms'><h2>" +
      t("pages|concept_page$alternativ_term") +
      '</h2><span>{{ text content="${skos:altLabel}" }}</span></div>' +
      "{{/ifprop}}" +
      '{{#ifprop "skos:example"}}<div><h2>' +
      t("pages|concept_page$example") +
      '</h2><span>{{ text content="${skos:example}" }}</span></div>' +
      "{{/ifprop}}" +
      '{{#ifprop "rdf:type" uri="skos:ConceptScheme" invert="true"}}' +
      "<div data-test-id='superior-concepts'><h2>" +
      t("pages|concept_page$superior_concept") +
      "</h2>" +
      '{{#ifprop "skos:broader"}}{{broaderList}}{{/ifprop}}' +
      '{{#ifprop "skos:broader" invert="true"}}' +
      '<span class="mb-xl">' +
      t("pages|concept_page$no_superior_concept") +
      "</span>" +
      "{{/ifprop}}</div>" +
      '<div data-test-id="subordinate-concepts" class="subordinateConcepts"><h2>' +
      t("pages|concept_page$subordinate_concepts") +
      "</h2>" +
      '{{#ifprop "skos:narrower"}}{{narrowerList}}{{/ifprop}}' +
      '{{#ifprop "skos:narrower" invert="true"}}' +
      "<span>" +
      t("pages|concept_page$no_subordinate_concepts") +
      "</span>" +
      "{{/ifprop}}</div>" +
      "<div data-test-id='related-concepts'><h2>" +
      t("pages|concept_page$related_concepts") +
      "</h2>" +
      '{{#ifprop "skos:related"}}{{relatedList}}{{/ifprop}}' +
      '{{#ifprop "skos:related" invert="true"}}' +
      "<span>" +
      t("pages|concept_page$no_related_concepts") +
      "</span>" +
      "{{/ifprop}}</div>" +
      "{{/ifprop}}" +
      '{{#ifprop "skos:historyNote"}}' +
      "<div>" +
      "<h2>" +
      t("pages|concept_page$historical_note") +
      "</h2>" +
      '<span>{{ text content="${skos:historyNote}" }}</span>' +
      "</div>" +
      "{{/ifprop}}" +
      '{{#ifprop "skos:editorialNote"}}' +
      "<div>" +
      "<h2>" +
      t("pages|concept_page$editorial_note") +
      "</h2>" +
      '<span>{{ text content="${skos:editorialNote}" }}</span>' +
      "</div>" +
      "{{/ifprop}}" +
      '{{#ifprop "skos:note"}}' +
      "<div>" +
      "<h2>" +
      t("pages|concept_page$note") +
      "</h2>" +
      '<span>{{ text content="${skos:note}" }}</span>' +
      "</div>" +
      "{{/ifprop}}",
  },
  {
    block: "conceptHierarchy",
    extends: "template",
    template: `{{#ifprop "rdf:type" uri="skos:ConceptScheme" invert="true"}}<h2>${t(
      "pages|concept_page$visualization_concepts",
    )}</h2><div class="concept_hierarchy">{{hierarchy scale="1.7"}}</div>{{/ifprop}}`,
  },
];
