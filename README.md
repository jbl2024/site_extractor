# Site extractor

Extract metadata from URL

## Installation

```
$ npm install
```

## Usage

### Command line
```
$ node index.js --url https://www.w3.org/ --output /tmp/output.json
```

### REST Api

```
$ node index.js --port 9001 --host localhost
```

## Metadata
```
{
  canonicalUrl: 'https://www.w3.org/',
  article: {
    title: 'World Wide Web Consortium (W3C)',
    byline: 'Bert Bos',
    dir: null,
    content: '<div id="readability-page-1" class="page"><div>\n' +
      '      \n' +
      '      <div><p><a href="https://www.w3.org/2020/09/web-roadmaps/mobile/"><img src="https://www.w3.org/2020/09/web-roadmaps/assets/img/mobile-lifecycle.svg" alt="Icon representing mobile life-cycle" width="100"></a>W3C has published a new version of its <a href="https://www.w3.org/2020/09/web-roadmaps/mobile/">Roadmap of Web Applications on Mobile</a>, an overview of the various technologies developed in W3C that increase the capabilities of Web applications, and how they apply more specifically to the mobile context.</p>\n' +
      '<p>The September 2020 snapshot refreshes the list of technologies under incubation in Community Groups or on the standardization track in Working Groups. See the <a href="https://www.w3.org/2020/09/web-roadmaps/mobile/about.html#september-2020-0">Change history since November 2019</a> for details. Standardization proposals that have emerged since last publication include:</p>\n' +
      '<ul>\n' +
      '<li>various proposals focused on privacy (such as the Storage Access API, the Trust Token API, Private Click Measurement, TURTLEDOVE, or the isLoggedIn proposal), described in <a href="https://www.w3.org/2020/09/web-roadmaps/mobile/security.html">Security and Privacy</a>;</li>\n' +
      '<li>exploration of standards needed for so-called MiniApps, see <a href="https://www.w3.org/2020/09/web-roadmaps/mobile/lifecycle.html">Application Lifecycle</a>;</li>\n' +
      '<li>main thread scheduling APIs to improve scheduling primitives, see <a href="https://www.w3.org/2020/09/web-roadmaps/mobile/performance.html">Performance and Tuning</a>;</li>\n' +
      '<li>Web Monetization to enable continuous and small payments facilitated by the browser, see <a href="https://www.w3.org/2020/09/web-roadmaps/mobile/payment.html">Payment and Services</a>;</li>\n' +
      '</ul>\n' +
      '<p>Former proposals under incubation in Community Groups have moved to the standardization track since November 2019. For instance, the WebTransport API is now in scope of the recently created WebTransport Working Group (see <a href="https://www.w3.org/2020/09/web-roadmaps/mobile/network.html">Network and Communications</a>). The GPU for the Web Working Group has also been recently created to standardize the WebGPU and WebGPU Shading Language specifications, incubated in the GPU for the Web Community Group (see <a href="https://www.w3.org/2020/09/web-roadmaps/mobile/graphics.html">Graphics and Layout</a>).</p>\n' +
      '<p>Implementation info for all features has been updated. A number of features that were previously in development, under consideration, or simply not implemented have now shipped in the new version of Edge, based on Chromium. Main technologies behind Web Components, which allow applications to encapsulate their logic in re-usable components, are now available across browsers (see <a href="https://www.w3.org/2020/09/web-roadmaps/mobile/adaptation.html">Device Adaptation</a>). Similarly, Web Animations, which allow application to manage animations via scripting, are available across main browsers (see <a href="https://www.w3.org/2020/09/web-roadmaps/mobile/graphics.html">Graphics and Layout</a>).</p>\n' +
      '<p>Last but not least, a new <a href="https://www.w3.org/2020/09/web-roadmaps/mobile/groups.html">groups page</a> summarizes groups mentioned throughout the roadmap’s pages, along with the name of the specifications and features that these groups are (or were) responsible for.</p>\n' +
      '<p><em>Sponsored by Beihang University, this project is part of a set of roadmaps under development in a <a href="https://github.com/w3c/web-roadmaps/">GitHub repository</a> to document existing standards, highlight ongoing standardization efforts, point out topics under incubation, and discuss technical gaps that may need to be addressed in the future. New versions are published as needed depending on progress of key technologies of the Web platform. We encourage the community to review them and raise comments, or suggest new ones, in the repository’s <a href="https://github.com/w3c/web-roadmaps/issues/">issue tracker</a>.</em></p>\n' +
      '</div>\n' +
      '   </div><div>\n' +
      '      \n' +
      '      <div><p><a href="https://www.w3.org/2020/09/pressrelease-process-document-patent-policy-2020.html.en"><img src="https://www.w3.org/comm/assets/icons/megaphone.png" alt="megaphone" width="100"></a>The <a href="https://www.w3.org/2020/Process-20200915/">15 September 2020 W3C Process Document</a> and <a href="https://www.w3.org/Consortium/Patent-Policy-20200915/">15 September 2020 W3C Patent Policy</a> take effect today. At a time when the Web is increasingly essential with the world going more and more virtual, these updates increase the Web Consortium’s responsiveness and strengthen standardization activities by adding a continuous standard development mode and earlier Royalty-Free protection for implementers, among other changes. Please read more in our <a href="https://www.w3.org/2020/09/pressrelease-process-document-patent-policy-2020.html.en">press release</a>.</p>\n' +
      '<p>Of the changes to the W3C Process Document, the most anticipated ones offer a real boost in helping the Web serve the community:</p>\n' +
      '<ul>\n' +
      '<li>streamlined community review and review for integrity\n' +
      '\t(Horizontal review to ensure accessibility,\n' +
      '\tinternationalization, privacy, and security);</li>\n' +
      '<li>flexibility for multiple work modes, including stability of referenced\n' +
      '\tversions and reflection of the current status in the technical reports list; </li>\n' +
      '<li>a continuous development mode that enables specifications to reflect\n' +
      '\trapidly developing technology –including a living standard\n' +
      '\tapproach as a native capability of the W3C Recommendation\n' +
      '\tTrack.</li>\n' +
      '</ul>\n' +
      '<p>These critical improvements required an important change to the W3C Patent Policy –the first major update to this groundbreaking document since its introduction to the world in 2005– to provide patent protection at earlier Candidate phases, supporting unencumbered implementation and use even as specifications continue to evolve. This change helps to de-risk Web experimentation and reinforce access to the Web’s technology as common infrastructure.</p>\n' +
      '<p>The documents were developed by the <a href="https://www.w3.org/2002/ab/">W3C Advisory Board</a>, the public <a href="https://www.w3.org/community/w3process">Revising W3C Process Community Group</a> and the <a href="https://www.w3.org/2004/pp/psig/">Patents and Standards Interest Group (PSIG)</a>. Comments and feedback on the new Process Document may be sent as issues in the <a href="https://github.com/w3c/w3process/issues">public GitHub Repository</a>.</p>\n' +
      '</div>\n' +
      '   </div><div>\n' +
      '      \n' +
      '      <p>\n' +
      'The Accessibility Guidelines Working Group (<a href="https://www.w3.org/WAI/GL/">AG WG</a>) has published a Working Draft of <a href="https://www.w3.org/TR/2020/WD-WCAG22-20200811/">Web Content Accessibility Guidelines (WCAG) 2.2</a> for wide review. This version has 9 new accessibility requirements (“success criteria”) since WCAG 2.1. The new success criteria address user needs of people with cognitive or learning disabilities, users of mobile devices, and users of ebooks. We want to hear from users, authors, tool developers, policy makers, and others about benefits from the new proposed success criteria, as well as how achievable you feel it is to conform to the new success criteria. Additional information is in the blog post <a href="https://www.w3.org/blog/2020/08/wcag22-wide-review/">Web Content Accessibility Guidelines (WCAG) 2.2 Draft for Review</a>. Please submit comments by 18 September 2020.</p>\n' +
      '   </div></div>',
    textContent: '\n' +
      '      \n' +
      '      W3C has published a new version of its Roadmap of Web Applications on Mobile, an overview of the various technologies developed in W3C that increase the capabilities of Web applications, and how they apply more specifically to the mobile context.\n' +
      'The September 2020 snapshot refreshes the list of technologies under incubation in Community Groups or on the standardization track in Working Groups. See the Change history since November 2019 for details. Standardization proposals that have emerged since last publication include:\n' +
      '\n' +
      'various proposals focused on privacy (such as the Storage Access API, the Trust Token API, Private Click Measurement, TURTLEDOVE, or the isLoggedIn proposal), described in Security and Privacy;\n' +
      'exploration of standards needed for so-called MiniApps, see Application Lifecycle;\n' +
      'main thread scheduling APIs to improve scheduling primitives, see Performance and Tuning;\n' +
      'Web Monetization to enable continuous and small payments facilitated by the browser, see Payment and Services;\n' +
      '\n' +
      'Former proposals under incubation in Community Groups have moved to the standardization track since November 2019. For instance, the WebTransport API is now in scope of the recently created WebTransport Working Group (see Network and Communications). The GPU for the Web Working Group has also been recently created to standardize the WebGPU and WebGPU Shading Language specifications, incubated in the GPU for the Web Community Group (see Graphics and Layout).\n' +
      'Implementation info for all features has been updated. A number of features that were previously in development, under consideration, or simply not implemented have now shipped in the new version of Edge, based on Chromium. Main technologies behind Web Components, which allow applications to encapsulate their logic in re-usable components, are now available across browsers (see Device Adaptation). Similarly, Web Animations, which allow application to manage animations via scripting, are available across main browsers (see Graphics and Layout).\n' +
      'Last but not least, a new groups page summarizes groups mentioned throughout the roadmap’s pages, along with the name of the specifications and features that these groups are (or were) responsible for.\n' +
      'Sponsored by Beihang University, this project is part of a set of roadmaps under development in a GitHub repository to document existing standards, highlight ongoing standardization efforts, point out topics under incubation, and discuss technical gaps that may need to be addressed in the future. New versions are published as needed depending on progress of key technologies of the Web platform. We encourage the community to review them and raise comments, or suggest new ones, in the repository’s issue tracker.\n' +
      '\n' +
      '   \n' +
      '      \n' +
      '      The 15 September 2020 W3C Process Document and 15 September 2020 W3C Patent Policy take effect today. At a time when the Web is increasingly essential with the world going more and more virtual, these updates increase the Web Consortium’s responsiveness and strengthen standardization activities by adding a continuous standard development mode and earlier Royalty-Free protection for implementers, among other changes. Please read more in our press release.\n' +
      'Of the changes to the W3C Process Document, the most anticipated ones offer a real boost in helping the Web serve the community:\n' +
      '\n' +
      'streamlined community review and review for integrity\n' +
      '\t(Horizontal review to ensure accessibility,\n' +
      '\tinternationalization, privacy, and security);\n' +
      'flexibility for multiple work modes, including stability of referenced\n' +
      '\tversions and reflection of the current status in the technical reports list; \n' +
      'a continuous development mode that enables specifications to reflect\n' +
      '\trapidly developing technology –including a living standard\n' +
      '\tapproach as a native capability of the W3C Recommendation\n' +
      '\tTrack.\n' +
      '\n' +
      'These critical improvements required an important change to the W3C Patent Policy –the first major update to this groundbreaking document since its introduction to the world in 2005– to provide patent protection at earlier Candidate phases, supporting unencumbered implementation and use even as specifications continue to evolve. This change helps to de-risk Web experimentation and reinforce access to the Web’s technology as common infrastructure.\n' +
      'The documents were developed by the W3C Advisory Board, the public Revising W3C Process Community Group and the Patents and Standards Interest Group (PSIG). Comments and feedback on the new Process Document may be sent as issues in the public GitHub Repository.\n' +
      '\n' +
      '   \n' +
      '      \n' +
      '      \n' +
      'The Accessibility Guidelines Working Group (AG WG) has published a Working Draft of Web Content Accessibility Guidelines (WCAG) 2.2 for wide review. This version has 9 new accessibility requirements (“success criteria”) since WCAG 2.1. The new success criteria address user needs of people with cognitive or learning disabilities, users of mobile devices, and users of ebooks. We want to hear from users, authors, tool developers, policy makers, and others about benefits from the new proposed success criteria, as well as how achievable you feel it is to conform to the new success criteria. Additional information is in the blog post Web Content Accessibility Guidelines (WCAG) 2.2 Draft for Review. Please submit comments by 18 September 2020.\n' +
      '   ',
    length: 5336,
    excerpt: 'The World Wide Web Consortium (W3C) is an international community where Member organizations, a full-time staff, and the public work together to develop Web standards.',
    siteName: null
  },
  imageUrl: 'https://www.w3.org/comm/assets/icons/megaphone.png',
  colors: {
    color: 'rgb(233, 233, 234)',
    palette: [
      'rgb(233, 233, 234)',
      'rgb(42, 86, 121)',
      'rgb(143, 155, 164)',
      'rgb(116, 116, 116)',
      'rgb(130, 195, 91)'
    ]
  }
}
```