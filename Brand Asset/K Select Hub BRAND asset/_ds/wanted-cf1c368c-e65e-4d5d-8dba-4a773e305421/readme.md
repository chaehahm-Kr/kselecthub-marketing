# Wanted Design System

A full import of the community Figma file **“Wanted Design System (Community).fig”**, mounted for this
project as a read-only virtual filesystem. Wanted is a Korean recruiting platform; the file is the
public design system its product teams publish, covering the job-board web experience, the iOS/Android
apps and the sub-service brands (Wanted Gigs, Wanted Space, Wanted Agent, Wanted OneID, LaaS).

Everything here — colours, type scale, spacing, components, icons and logotypes — was extracted from
that file. No values were rounded, snapped to a grid, or taken from public documentation.

## Sources

| Source | Notes |
| --- | --- |
| `Wanted Design System (Community).fig` | The only source. Attached by the user and mounted read-only. 26 pages, 101,532 nodes, 959 component families, 488 Figma Variables. |

Pages that carried the substance: **Color – Atomic**, **Color – Semantic**, **Typography**, **Grid**,
**Spacing**, **Icon**, **Logo**, **1-Theme / 2-Element / 3-Component** (the component library, grouped
Layout → Action → Selection & Input → Content → Loading → Navigation → Feedback → Presentation), and
**Work** (a full recreation of the Wanted job-board home, desktop and mobile — the basis of the UI kit).

No GitHub repository, codebase or deck was provided.

## Index

- `styles.css` — the single entry point consumers link. `@import` list only.
- `tokens/fig-tokens.css` — all 488 Figma Variables across all 6 collections and every theme mode
  (Light, Dark, Mobile, Desktop, Bright, Dim, IC-Light, IC-Dark, and the four size modes). Float tokens
  are unitless — multiply by `1px` in `calc()`.
- `tokens/typography.css` — the 19-step type scale as custom properties plus `.wds-*` classes.
- `tokens/fonts.css` — `@font-face` for Pretendard JP and Wanted Sans.
- `tokens/base.css` — element defaults (body, link colours).
- `components/core/` — 342 React components materialized from the Figma component sets.
- `components/glyph_sets/` — 16 legacy stand-alone glyph toggle sets.
- `components/icons/` — `Icon` + `icon-data.js`, 216 glyphs.
- `assets/logos/` — `Logo` + `icon-data.js`, 38 brand marks.
- `guidelines/` — 18 foundation specimen cards (Colors, Type, Spacing).
- `ui_kits/wanted_web/` — the Wanted job-board recreation. See its `README.md`.
- `SKILL.md` — Agent-Skills front matter so this folder works as a Claude Code skill.

## Content fundamentals

The file's own copy is **Korean, written in the polite declarative `-습니다` / `-세요` register**.
Component documentation states purpose in one sentence, verb-final, no exclamation:

> Button — “사용자가 원하는 동작을 수행할 수 있도록 돕습니다.”
> (“Helps the user carry out the action they want.”)

Rules the file follows consistently:

- **Address the user as 회원님 / 본인**, never a familiar pronoun. English UI copy should mirror this:
  neutral second person (“you”), never “we”.
- **Buttons are verb phrases**: 지원하기, 이력서 등록하기, 더보기. English equivalents stay imperative
  and short — “Apply”, “Add resume”, “See more”. Never “Click here”.
- **No emoji anywhere.** Not in labels, not in empty states, not in documentation.
- **No exclamation marks** in product copy. Encouragement is carried by the verb, not punctuation.
- **English product nouns stay in Latin script inside Korean sentences** — “Wanted Space”, “LaaS”,
  “AI 추천”. Never transliterated.
- **Casing:** English labels are sentence case (“Recommended positions”), not Title Case. Component and
  token names in the file itself are Title Case with slashes (`Button/Icon Button/Outlined`).
- **Numbers are concrete**: “응답률 90%”, “12명 지원”. Badges hold a number or a two-to-four-syllable
  status word (NEW, 마감임박), never a sentence.
- **Vibe:** calm, factual, professional. It is a career product for working adults — the tone is that of
  a competent colleague, not a cheerleader. Nothing is playful; nothing is stern.

## Visual foundations

**Colour.** One brand colour: **Wanted Blue `#0066FF`** (`--blue-50`, semantic `--primary-normal`;
the Ungrouped collection also carries a slightly violet `rgb(51,102,255)` alias). Its interaction ramp
is `--primary-strong #005EEB` → `--primary-heavy #0054D1`. Everything else is **cool neutral** — a
16-step grey ramp from `#0F0F10` to `#F7F7F8` tuned very slightly blue. Semantic status is only three
values: positive `#00BF40`, cautionary `#FF9200`, negative `#FF4242`. Seven categorical accents
(violet, purple, light blue, cyan, lime, pink, red-orange) exist for tags and illustration only — they
never appear on interactive chrome. **Labels, lines and fills are opacity-based**, not separate greys:
`--label-alternative` is `rgba(55,56,60,.61)`, `--line-normal-normal` is `rgba(112,115,124,.22)`,
`--fill-normal` is `rgba(112,115,124,.08)`. This is the single most characteristic thing about the
palette — layer translucent neutrals over the surface rather than picking a solid grey.

**Type.** Pretendard JP throughout the product (Korean/Japanese/Latin in one metric-compatible face);
Wanted Sans only for the logotype and marketing display. Nineteen steps: Display 1–3 (56/40/36),
Title 1–3 (32/28/24), Heading 1–2 (22/20), Headline 1–2 (18/17), Body 1–2 (16/15, each with a Normal
and a Reading line-height), Label 1–2 (14/13), Caption 1–2 (12/11). **Tracking is a function of size**:
negative and tightening as size grows (−0.0319em at 56px), crossing zero at 17px, then positive and
widening as size shrinks (+0.0311em at 11px). Weights are Bold (700) for Display/Title, SemiBold (600)
for Heading/Headline/Label/Caption, Medium (500) for Body. Regular is rare.

**Spacing & layout.** A 4-based step (2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64). Desktop content
column is 1060px inside a 1440 frame; mobile margin is 16px, with a 20px platform margin token
(`--value-margin-platform: 20`). Breakpoints are named xs / sm / md / lg / xl and appear as component
variants (GNB, Footer) rather than CSS media queries.

**Radii.** 4 → 8 → 12 → 16 → 20, plus `1000px` for fully-round pills. Buttons and chips are pills at
small sizes and 8–12px at large. Cards are 12–16px. Avatars use a squircle mask, not a circle, for the
company and academy variants.

**Elevation.** Soft, low-opacity, pure black or near-black — never coloured, never tinted with the brand
hue. The four shadows in use are `0 1 2 / black 8%`, `0 2 8 / black 8%`, `0 4 16 / black 12%` and
`0 8 24 / #171717 10%`. Cards on the job board carry **no shadow at all** — they are separated by a
`--line-normal-alternative` hairline or by whitespace. Shadow is reserved for things that float:
menus, tooltips, popovers, snackbars, the FAB.

**Cards.** White surface, 12–16px radius, hairline border or none, no shadow, generous internal padding,
a 3:2 or 4:3 thumbnail at the top or leading edge. Skeleton variants ship with every card — loading is a
first-class state in this system, not an afterthought.

**Interaction.** Hover, press and focus are handled by a dedicated `Decorate/Interaction` overlay
component that sits above the element and applies a flat black (or white, on dark) scrim: 0% normal,
**5% hovered, 11% pressed, 11% focused**. Nothing changes colour, nothing scales, nothing bounces. Disabled
state drops to `--label-disable` text on `--interaction-disable` fill. This overlay model is why the
kit has `Interaction/Light`, `Interaction/Normal` and `Interaction/Strong` as real components.

**Motion.** The file specifies almost none. The only animated components are `Circular/Circular` and
`Circular/Wanted` (indeterminate spinners) and the skeleton shimmer. Treat transitions as short and
linear-to-ease-out (120–200ms); do not add bounce, spring or scale-on-press.

**Transparency & blur.** Used sparingly and only for chrome over content: the scrolled GNB, the iOS
status/navigation bars, and `Background/Transparent/*` tokens at 8% and 28% white. Dimmers behind
modals are `--material-dimmer` (`rgba(23,23,25,.52)` light, `.74` dark) — a flat scrim, not a blur.

**Gradients.** Only as **protection and masking**, never as decoration. `Gradient/Solid` fades a solid
surface colour out in one of four directions to protect text over a thumbnail; `Gradient/Mask` fades the
edge of a horizontally-scrolling rail. There are no brand gradients and no gradient backgrounds.

**Imagery.** Photographic, warm-neutral, natural light, no filters or grain. Company logos sit on white
squircles. Avatars are photographic; placeholders are a neutral glyph on `--fill-normal`. There are no
illustrations in this file.

**Dark mode** is a real, complete second theme — 55 Theme-collection variables remap Primary, Label,
Background, Line, Fill and Status. `tokens/fig-tokens.css` exposes it under `:root[data-theme="dark"]`.

## Iconography

- **One in-house line icon family, 216 glyphs**, extracted to `components/icons/icon-data.js` and
  rendered with `<Icon name="IconNormalSearch" size={24} />`. No icon font, no CDN set, no substitutions.
- Grid is **24×24**; a `Small` axis renders the same glyph at 20×20 and a `Tight` axis trims optical
  padding on chevrons.
- **Two weights**: a default and a `Thick` variant on the glyphs that need to read at small sizes
  (arrows, chevrons, check, close, plus, minus, menu, search, line).
- **Line and fill pairs**: most object glyphs ship both (`Bell` / `Bell Fill`), fill being the
  selected/active state — bookmark, heart, bell, star, business bag, company, person, home, lock, eye.
- Glyphs paint with `currentColor` — set colour on the element, never inside the SVG.
- **Third-party marks** (`Icon/Color/Logo …`) keep their brand colours: Apple, Facebook, Google,
  Google Play, Instagram, Kakao, LinkedIn, Naver Blog, X, YouTube.
- **Five navigation glyphs** (`Icon/Navigation/Recruit | Career | Social | My Page | Menu`) are drawn
  differently from the rest — heavier, tab-bar specific — and are not interchangeable with `Icon/Normal`.
- **Emoji are never used.** Unicode characters are used only as separators: the middle dot `·` between
  metadata fragments (“서울 · 강남구”) and the vertical bar in footers.

## Components (371)

All in `components/core/` unless noted. Names are the Figma component-set names flattened to PascalCase,
so `Button/Button` → `ButtonButton` and `Card/Resource/Normal/Save` → `CardResourceNormalSave`.
Components whose name contains `Resource` are the design system's own internal sub-parts — they are
exported because the parent components reference them, but you rarely mount them directly.

**Buttons** — ButtonButton, ButtonFloatingActionButton, ButtonIconBackground, ButtonIconButtonBackground, ButtonIconButtonNormal, ButtonIconButtonOutlined, ButtonIconNormal, ButtonIconOutlined, ButtonIconSolid, ButtonOutlined, ButtonRoundButtonAlternative, ButtonRoundButtonAssistive, ButtonRoundButtonPrimary, ButtonRoundButtonSecondary, ButtonText, ButtonText3, ButtonTextButtonAssistive, ButtonTextButtonPrimary

**Chips, categories & badges** — Badge, BadgePush, BadgePush2, BadgeStatus, BadgeValue, CategoryCategory, CategoryResourceChipAlternativeLarge, CategoryResourceChipAlternativeNormal, CategoryResourceChipAlternativeSmall, CategoryResourceChipAlternativeXSmall, CategoryResourceChipNormalLarge, CategoryResourceChipNormalNormal, CategoryResourceChipNormalSmall, CategoryResourceChipNormalXSmall, ChipAction, ChipChip, ChipFilter, ChipMultiSelect, ChipResourceContentImage, ContentBadgeContentBadge, FilterButtonFilterButton, PushBadgePushBadge, PushBadgePushBadge3

**Selection & input** — AutoCompleteAutoComplete, AutoCompleteResourceItemAction, AutoCompleteResourceItemCell, AutoCompleteResourceItemTitle, CheckMarkResourceControl, CheckboxResourceControl, ControlCheck, ControlCheckMark, ControlCheckbox, ControlRadio, ControlSwitch, ControlSwitchKnob, ControlToggleIcon, ControlToggleIcon2, DatePickerIOSWheel, FramedStyleFramedStyle, FramedStyleResourceFrame, FramedStyleResourceSelected, FramedStyleResourceSlot, RadioResourceControl, SegmentedControlResourceKnob, SegmentedControlSegmentedControl, SelectResourceBackground, SelectResourceChip, SelectResourceLeadingContent, SelectSelect, SelectionInputToggleResourceSwitch, SelectionInputToggleSwitch, SwitchResourceSwitch, SwitchSwitch, TextinputResourceBackground, TextinputResourceInteraction, TextinputResourceTextareaLeadingContent, TextinputResourceTextareaTrailingContent, TextinputResourceTextfieldButton, TextinputResourceTextfieldTrailingConten, TextinputTextarea, TextinputTextfield

**Content** — AvatarAcademic, AvatarAvatar, AvatarAvatarGroup, AvatarCompany, AvatarPerson, AvatarPersonXSmallIcon, AvatarResourceAvatarGroupTrailing, AvatarResourceImageAcademic, AvatarResourceImageAcademy, AvatarResourceImageCompany, AvatarResourceImageCompany2, AvatarResourceImageCompany3, AvatarResourceImagePerson, AvatarResourceImagePerson2, AvatarResourceImagePerson3, AvatarResourcePlaceholderAcademic, AvatarResourcePlaceholderAcademy, AvatarResourcePlaceholderCompany, AvatarResourcePlaceholderCompany2, AvatarResourcePlaceholderPerson, AvatarResourcePlaceholderPerson2, CardCard, CardListCard, CardResourceListLeadingContent, CardResourceListTrailingContent, CardResourceListTrailingContent2, CardResourceNormalSave, CardResourceNormalTopContent, CellResourceTrailingContentBadge, CellResourceTrailingContentCheckbox, CellResourceTrailingContentIcon, CellResourceTrailingContentIcon2, CellResourceTrailingContentSwitch, CellResourceTrailingContentText, CellResourceTrailingContentValue, Content, Image, ImageLanguage, Link, ListCellListCell, ListCellResourceLeadingContent, ListCellResourceLeadingContent2, ListCellResourceLeadingContent3, ListCellResourceLeadingContent4, ListCellResourceLeadingContent6, Name, ProjectAfter, ProjectAfterName, ProjectBefore, ThumbnailResourceOverlayCustom, ThumbnailThumbnail, Time

**Feedback** — AlertAlert, AlertAlertWebDesktop, AlertResourceAction, AlertResourceDialog, CircularCircular, CircularCircular2, CircularWanted, Dummy, PopoverPopover, PopoverResourceContents, SkeletonRectangle, SkeletonText, SnackbarSnackbar, ToastToast, TooltipResourceMediumArrow, TooltipResourceMediumArrowHorizontal, TooltipResourceMediumArrowVertical, TooltipResourceSmallArrow, TooltipResourceSmallArrowHorizontal, TooltipResourceSmallArrowVertical, TooltipTooltip

**Navigation & shell** — ActionAreaActionArea, ActionAreaResourceActions, ActionAreaResourceCompactPreset, ActionAreaResourceExtraPreset, BottomNavigationBottomNavigation, BottomNavigationResourceContent, BottomNavigationResourceTabAndroid, BottomNavigationResourceTabIOS, BottomNavigationResourceTabWeb, EssentialEssential, FooterFooter, GNBWanted, HomeBarHomeBar, HomeBarResourceHomeIndicator, MenuMenu, MenuResourceActionArea, MenuResourceActionAreaLeading, MenuResourceActionAreaTrailing, MenuResourceItemCell, MenuResourceItemTitle, NavigationBarNavigationBar, NavigationBarResourceHomeIndicator, NavigationBarResourceIconBack, NavigationBarResourceIconHome, NavigationBarResourceIconRecent, NavigationNavigation, PageIndicatorResourceDotNormal, PageIndicatorResourceDotNormal2, PaginationDots, PaginationNavigation, PaginationResourceDotSmallAdaptive, PaginationResourceDotSmallWhite, PaginationResourceNavigationContentLimit, PaginationResourceNavigationContentNavga, SafariBarBar, SafariBarNavigationBar, SafariBarResourceButton, SafariBarResourceNav, SafariBarResourceNavBg, SafariBarResourceNavSymbol, SafariResourceBarTitle, ScrollBarScrollBar, SectionHeaderResourceLeadingContent, SectionHeaderResourceTrailingContent, SectionHeaderResourceTrailingContent3, SectionHeaderSectionHeader, StatusBarResourceStatus, StatusBarResourceStatusNotch, StatusBarResourceStatusNotch2, StatusBarResourceStatusPill, StatusBarResourceTime, StatusBarResourceTimeNotch, StatusBarResourceTimeNotch2, StatusBarResourceTimePill, StatusBarStatusBar, StatusBarStatusBar2, TabResourceTab, TabTab, TopNavigationResourceActionFloat, TopNavigationResourceActionFloat2, TopNavigationResourceActionNormal, TopNavigationResourceContents, TopNavigationResourceLeadingFloat, TopNavigationResourceLeadingNormal, TopNavigationResourceLeadingNormal2, TopNavigationResourceLeadingNormal3, TopNavigationResourceToolSegmented, TopNavigationResourceToolTab, TopNavigationResourceTrailingNormal, TopNavigationTopNavigation

**Layout, decoration & primitives** — BackgroundGradientElevatedTrue, BackgroundGradientNormalTrue, BasicDivider, Blank, ColorOverlay, CustomGradient, DecorateDimmer, DecorateInteraction, DecorateInteractionLight, DecorateInteractionLight2, DecorateInteractionNormal, DecorateOpacity, Dimmer, DividerDivider, GradientBackgroundGradient, GradientCustomGradient, GradientMask, GradientMultiple, GradientResourceMaskBase, GradientResourceMaskSize, GradientSolid, GradientSolid2, GradientStaticGradient, InspectMeasure, InteractionLight, InteractionLight2, InteractionLight3, InteractionNormal, InteractionNormal2, InteractionStrong, MaskSquircle, MasterGrid, PointingDeviceCursor, PresentationAlertResourceBackground, PresentationPickerResourceGradient, PresentationPickerWheels, Ratio, RatioHorizontal, RatioVertical, RatioVertical2, RatioVertical3, RatioVertical4, SafeAreaBottom, SpacingBottomSafeArea, SpacingBottomSafeArea4, SpacingBottomSafeArea5, SpacingStatus, SpacingStatus5, SpacingStatus6, ThemePrimaryButton

**Icon primitives & standalone glyphs** — AgentAlt3, Bookmark, Bubble, BusinessBag, Camera, ChevronLeft, ChevronRight, IconColorBookmarkNew, IconIcons, IconIcons2, IconIconsResponsive, IconNavigationCareer, IconNavigationMenu, IconNavigationMyPage, IconNavigationRecruit, IconNavigationSocial, IconNormalAward2, IconNormalBlank, IconNormalBlank3, IconNormalBlank5, IconNormalBlank6, IconNormalBookmark2, IconNormalBulb2, IconNormalCertificate2, IconNormalCheck, IconNormalCheck3, IconNormalChevronDown, IconNormalChevronDown3, IconNormalChevronRight2, IconNormalChevronRight3, IconNormalChevronUp, IconNormalChevronUp3, IconNormalCircleCheck2, IconNormalCircleExclamation2, IconNormalCircleInfo2, IconNormalDot, IconNormalDot3, IconNormalGlobe4, IconNormalHandleDesktop2, IconNormalLineHorizontal, IconNormalLineHorizontal3, IconNormalListCategory, IconNormalMenu3, IconNormalPerson, IconNormalSearch3, IconNormalSquareMore3, IconNormalSun2, IconNormalTrash3, IconNormalTriangleExclamation2, IconNormalTrophy2, IconResourceRatio, IconShortcut, IconsIcons, IconsIcons4, IconsIcons5, IconsIconsResponsive, LogoResourceAssetLogotypeWanted, LogoResourceAssetLogotypeWanted6, LogoResourceAssetSymbol, LogoResourceAssetSymbol2, LogoResourceAssetSymbolWanted, LogoResourceNormalHorizontalWanted, LogoResourceNormalHorizontalWanted10, LogoResourceNormalHorizontalWanted11, LogoWantedLogoHorizontal, LogoWantedLogoHorizontal3, LogoWantedLogoHorizontal4, LogoWantedResourceRatio, LogoWantedResourceRatio2, LogoWantedResourceRatio3

**Legacy glyph sets** (`components/glyph_sets/`) — ArrowWithTexts, ArrowWithTextsAlgorithm, AvartarResourcePlaceholderPerson, Divider, DocumentPerson, FaceSmile, Filter, Heart, Home, Like, Lock, Message, Person, Send, Star, Thunder. These are the older stand-alone
Fill/Outline toggle sets the file still carries alongside the modern `Icon/Normal` family; prefer `Icon`.

**Icons** — `components/icons/Icon` (216 glyphs). **Brand** — `assets/logos/Logo` (38 marks).

**UI kit** (`ui_kits/wanted_web/`) — HomeDesktop, HomeMobile, IconShortcut2, IconShortcut3, IconShortcut4, IconShortcut7, IconShortcut9, Screen, SectionHeaderResourceTrailingContent2, Shortcut15, Shortcut17.

### Intentionally not built as components

The file counts **959 component families**; 371 are built as React components. The gap is not missing work —
it is three categories that deliberately do not become one `.jsx` each:

1. **The icon set (~500 families).** Every glyph in the file is its own component set
   (`Icon/Normal/Check`, `Icon/Normal/Chevron Right`, `Icon/Color/Logo Apple`, `Icon/Color/!Blank`,
   `Icon/.Resource/Ratio`, …), plus a `Thick`, `Small`, `Tight` and `Fill` variant apiece. Shipping
   500 near-identical files would bloat every consumer's bundle, so all 216 distinct glyphs live in
   `components/icons/icon-data.js` and render through one `<Icon name="…" />` component. Coverage is
   complete; the count is just carried by a data file instead of by files.
2. **The 38 logo lockups**, for the same reason — `assets/logos/icon-data.js` + `<Logo name="…" />`.
3. **Per-variant duplicates.** The file carries several near-identical copies of the same family in
   different pages (four `Button/Round Button/Primary` sets, four `Decorate/Opacity` sets, three
   `Content Badge` sets, two of most `Avatar/Resource/*`). The extractor collapses these onto one
   component; the family counter still counts each copy.

Every family documented on the file's own component pages — Layout, Action, Selection & Input, Content,
Loading, Navigation, Feedback, Presentation, Theme, Icon, Logo — is present.

### Intentional additions

Two wrappers that the Figma file does not define as components, added because a few-hundred-glyph set
cannot sensibly ship as one file per glyph:

- `components/icons/Icon` — renders any of the 216 extracted glyphs by name.
- `assets/logos/Logo` — renders any of the 38 extracted brand marks by name.

Nothing else was invented. Component families the file does not define (Accordion, Table, Breadcrumb,
Progress, Date Picker for web, Stepper, Slider, Rating) are **absent on purpose** — do not add them.

## Caveats

- **Fonts are loaded from jsDelivr**, not from binaries in the .fig (the file ships none). Pretendard JP
  and Wanted Sans are both open source, so these are the real faces, not substitutes. Self-host by
  editing `tokens/fonts.css`. Three faces referenced by imported iOS/Android chrome — SF Pro, SF SD
  Text, Google Sans Text — fall back to the system stack.
- **The logotype does not render as vector.** The Logo component carries the real paths from the file,
  but their coordinate space does not survive extraction cleanly, so the project thumbnail renders the
  wordmark in Wanted Sans instead of using the mark. Verify `assets/logos/logos.card.html` before using
  `Logo` in a deliverable.
- **Coverage:** 371 components, 216 icons and 38 logos. See “Intentionally not built as components”
  above for why the raw family count is higher.
- Vectors flagged `no decodable geometry` (the `Ratio` spacer and a few `Filler` shapes) render as
  plain boxes; they are invisible layout helpers, so this is harmless.
- One avatar photo (4.8 MB) exceeded the asset budget and was dropped; that avatar falls back to its
  placeholder.
