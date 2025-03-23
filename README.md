## 1. Setup

Should be as easy as 1 (`clone`), 2 (`npm install`) and 3 (`npm run dev`).

## Decisions

### Technical

1. React -- because it's the framework I'm most familiar with.
2. Tailwind -- because it's quick for prototyping (and beyond).
3. Zustand -- for state management. Long term would make life easier if I was to implement undo, stats, etc.
4. Radix UI -- because it goes well with Tailwind and it takes care of a lot of the accessibility aspects.
5. Cmdk -- I needed something where I could offload some of the complexities of keyboard events. Turns out I couldn't avoid too much.

### UI

Based on severity text gets highlighted (red, orange, blue). Users can `tab` through violations, press `enter` to open the _violation management panel_ and keep using the keyboard to perform actions.

There are keyboard shortcuts implemented for most of the interactions a user could do, and these show every step of the way.

## Limitations & improvements

### Technical

1. Didn't do a thorough accessibility check and, for example, the color contrast might raise some issues.
2. Some of the components could be split further into smaller, more maintainable (and reusable) pieces of code.
3. There is an unexpected behavior when using the arrow keys to move through suggestions: the suggestion highlighted last will take precedence over the value present in the input field (when pressing `enter`).
4. I didn't focus on having a mobile friendly version.
5. The suggestion sanitization algorithm is early stage.
6. It might not be obvious from pageload that the user can press `tab` to move to the next violation.
7. I was planning to implement `undo` functionality but I ran out of time.

