# Glamrock :guitar: style guide.

## Salutations!

Thank you for taking a look at our style guide. In this README you'll find examples and explanation of the styling rules we use for Glamrock. We use these styling rules to keep Glamrock running buttery smooth.

### Code examples

Here are code examples to give you an idea of how we write our code and how we keep glamrock nice and tidy

#### Style inherenting

:no_entry_sign:

```javascript
import styled from "@xstyled/styled-components";

const Component = styled.div`
  background: primary;
  color: light;
`;

const ExtendedComponent = Component.extend`
  color: secondary;
`;
```

:white_check_mark:

```javascript
import styled from "@xstyled/styled-components";

const Component = styled.div`
  background: primary;
  color: light;
`;

const ExtendedComponent = styled(Component)`
  color: secondary;
`;
```

you should **always** inherent styling using the last method.

#### Default exports

:no_entry_sign:

```javascript
import React from "react";
import WYSIWYG from "../Wysiwyg";
import FlexibleContent from "../FlexibleContent";

export default ({ data }) => (
  <div>
    {data?.title && <h1>{data.title}</h1>}
    {data?.content && <WYSIWYG content={data.content} />}
    {data?.flexContent && (
      <FlexibleContent
        layouts={data?.flexContent?.flexiblecontent}
        type={data.__typename}
      />
    )}
  </div>
);
```

:white_check_mark:

```javascript
import React from "react";
import WYSIWYG from "../Wysiwyg";
import FlexibleContent from "../FlexibleContent";

const DefaultPage = ({ data }) => (
  <div>
    {data?.title && <h1>{data.title}</h1>}
    {data?.content && <WYSIWYG content={data.content} />}
    {data?.flexContent && (
      <FlexibleContent
        layouts={data?.flexContent?.flexiblecontent}
        type={data.__typename}
      />
    )}
  </div>
);

export default DefaultPage;
```

Naming your default exports is important for performance using next.js. The reason being is that next.js can't save the state with un-named default exports locally, which in turn will increase load time.

#### Link components

We have a custom Link component that uses the default NextLink component. You can use it like this:

```javascript
import Link from "@/components/Link";

<Link uri="/privacy-policy" url="http://localhost:3000/privacy-policy">
  link internal
</Link>;
```

```javascript
import Link from "@/components/Link";

<Link url="https://www.google.com/" target="_blank">
  link external
</Link>;
```

```javascript
import Link from "@/components/Link";

<Link
  isButton={true}
  uri="/privacy-policy"
  url="http://localhost:3000/privacy-policy"
>
  link button internal
</link>;
```

#### Styled components

For our styling we use styled components. Styled components are a CSS-in-JS tool that bridges the gap between components and styling, offering numerous features to get you up and running in styling components in a functional and reusable way. On top of that we use [xstyled](https://xstyled.dev/docs/installation/). This package, similar to the previously used design-system package, is a utility-first CSS-in-JS framework built for React. It makes it easy to consistent design system and scale it over time. Here's an example with a lot of markup:

```javascript
import { x } from "@xstyled/styled-components";

function Example() {
  return (
    <x.div p={{ _: 3, md: 6 }} bg="light" display="flex" spaceX={4}>
      <x.div flexShrink={0}>
        <x.img h={12} w={12} src="/img/logo.svg" alt="xstyled Logo" />
      </x.div>
      <x.div>
        <x.h4
          fontSize={{ _: "md", lg: "xl" }}
          fontWeight="medium"
          color="black"
        >
          xstyled
        </x.h4>
        <x.p color="primary">A CSS-in-JS framework built for React.</x.p>
      </x.div>
    </x.div>
  );
}
```

It also comes with a CSS Flexbox grid and CSS Grid system. Take a look at these examples:

```javascript
  // Example Flexbox Grid
  <x.div container overflow="hidden" px={2} mb={3}>
    <x.div row mx={-2}>
      <x.div col={1 / 2} bg="secondary">
        hoi
      </x.div>
      <x.div col={1 / 2} bg="dark-400">
        hoi
      </x.div>
      <x.div col={1 / 3} bg="secondary">
        hoi
      </x.div>
      <x.div col={1 / 3} bg="dark-400">
        hoi
      </x.div>
      <x.div col={1 / 3} bg="secondary">
        hoi
      </x.div>
    </x.div>
  </x.div>


  // Example Flexbox Grid + gutter (gutter size from theme.js)
  <x.div container overflow="hidden" mb={3}>
    <x.div row m={-2}>
      <x.div col={1 / 2} p={2}>
        <x.div bg="secondary">3</x.div>
      </x.div>
      <x.div col={1 / 2} p={2}>
        <x.div bg="dark-400">4</x.div>
      </x.div>
      <x.div col={1 / 3} p={2}>
        <x.div bg="secondary">5</x.div>
      </x.div>
      <x.div col={1 / 3} p={2}>
        <x.div bg="dark-400">6</x.div>
      </x.div>
      <x.div col={1 / 3} p={2}>
        <x.div bg="secondary">7</x.div>
      </x.div>
    </x.div>
  </x.div>

  // Example Grid Columns
  <x.div display="grid" gridTemplateColumns={3} gap={20}>
    <x.div bg="secondary">1</x.div>
    <x.div bg="dark-400">2</x.div>
    <x.div bg="secondary">3</x.div>
    <x.div bg="dark-400" gridColumn="span 2 / span 2">
      4
    </x.div>
    <x.div bg="secondary">5</x.div>
    <x.div bg="dark-400">6</x.div>
    <x.div bg="secondary" gridColumn="span 2 / span 2">
      7
    </x.div>
  </x.div>
```

#### Colors

We usually **never** use hex color values inside of our styled components. We **predefine** colors in `/frontend/theme.js`. You can put them under the `colors` section and then import `theme.js` inside of the `style.js` that you need the color in.

#### Code documentation

Code documentation is a broad thing to standardize, because of that we don't have a lot of rules set in place. However, we do ask you to document the functions you write. This'll prevent a lot of confusion in the future when we have to bugfix something.

:no_entry_sign:

```javascript
const accept = (e) => {
  e.preventDefault();

  const acceptedTypes = Object.keys(types).filter((i) => types[i] == true);

  setCookie({}, "cookieConsent", true, {
    maxAge: 365 * 24 * 60 * 60,
  });
  setCookie({}, "cookieAcceptedTypes", acceptedTypes.join(","), {
    maxAge: 365 * 24 * 60 * 60,
  });
};
```

a lot of code but no one except the person who wrote this can tell what it does or what is happening.

:white_check_mark:

```javascript
/**
 * Set cookies with values for consent validation
 */
const accept = (e) => {
  e.preventDefault();

  const acceptedTypes = Object.keys(types).filter((i) => types[i] == true);

  setCookie({}, "cookieConsent", true, {
    maxAge: 365 * 24 * 60 * 60, // set for a year
  });
  setCookie({}, "cookieAcceptedTypes", acceptedTypes.join(","), {
    maxAge: 365 * 24 * 60 * 60, // set for a year
  });
};
```

Short description that says exactly what it is and what it does.

Now, ofcourse, you don't have to document every single fuction you write. But if it's a big or a function that's used a lot some documentation would be appreciated. It'll also prevent us from having to look for a small function where a bug might be if we can just search for the documentation.

#### Stateless vs Stateful components

This should speak for itself, only use stateful components if **absolutely** and **utterly** necessary. Using classes has a big impact on the heap size of the web application, and that directly impacts build time for developers - and, most importantly, load time for our end users. React has, thankfully, thought of a good solution for this issue: **React hooks**. You can use states **outside** of classes since React**16.8**. Here are some examples of how to use the useState React Hook.

:no_entry_sign:

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

:thumbsdown: this is not good. You use a class and a lot of code for a really small function.

:white_check_mark:

```javascript
import React, { useState } from "react";

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

:thumbsup: much smaller bundle size == faster build & load time :smile:

There is another React Hook that gets used a lot, which is the **useEffect** Hook - this is the equivelant for the entire Life Cycle in stateful components.

:no_entry_sign:

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

:white_check_mark:

```javascript
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

Again, the bundle size is a lot smaller and this becomes a very simple function instead of a class. :smile: :thumbsup:

### Dynamic imports

Dynamic imports is a feature build into next.js to lazy load React components. Here are some code examples:

```javascript
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("../components/hello"));

function Home() {
  return (
    <div>
      <Header />
      <DynamicComponent />
      <p>HOME PAGE is here!</p>
    </div>
  );
}

export default Home;
```

This way React lazy load hello.jsx.

#### Why should we lazy load components?

A lot of the content that our end-users load when first compiling the website is outside of their viewport, but this still impacts their load time.

When lazy loading components we can tell React what's necessary to load before serving the website to the user, and then load the rest in after the website is served.

#### How do we lazy load images?

I am glad you asked! I have taken it upon myself to build a custom React component inside of Glamrock that'll take care of this for us.

Because it's just like any other React component you can import it. 1 Property is **mandatory** and that's the src prop. You can also pass down `alt` & `title` if you want to, but you don't have to

Here's an **example** of how it would look like in your component

```javascript
import React from "react";
import WYSIWYG from "../Wysiwyg";
import FlexibleContent from "../FlexibleContent";
import LazyImage from "../LazyImage";

const DefaultPage = ({ data }) => (
  <div>
    {data?.title && <h1>{data.title}</h1>}
    {data?.content && <WYSIWYG content={data.content} />}
    {data?.featuredImage && (
      <LazyImage
        //Mendatory
        src={data?.featuredImage?.sourceUrl}
        //Optional
        alt={data?.featuredImage?.altText}
        //Optional
        title={data?.featuredImage?.title}
      />
    )}
    {data?.flexContent && (
      <FlexibleContent
        layouts={data?.flexContent?.flexiblecontent}
        type={data.__typename}
      />
    )}
  </div>
);

export default DefaultPage;
```

There is some styling in place in `/frontend/components/LazyImage/styles.js` - you can always change this or remove it if you want to. While the image is being loaded there's a grey background in places that gets removed when the image is loaded.

### Some good to knows

Always build your app so it doesn't stop working if it doesn't receive a object. I will show you some operators you could use.

#### Logic AND

:no_entry_sign:

```javascript

const logicExample = () => (
  <Component {data}/>
)
```

If the application **doesn't** get data for whatever reason, it'll stop and spit out a TypeError.

:white_check_mark:

```javascript

const logicExample = () => (
  {data && <Component {data}/>}
)
```

It's a very simple fix, but this can be the difference between your app breaking and just skipping the line.

It'll first check if data is **true** and if it is it'll render Component. This way you always know Component gets data as a prop because it has to exist before that line is executed.

#### Ternary operator

With the ternary operator you can write your if and else statements very easily, this method can be used to render specific data depending on value of a variable or object.

:no_entry_sign:

```javascript

function example(…) {
    if (condition1) { return value1; }
    else if (condition2) { return value2; }
    else if (condition3) { return value3; }
    else { return value4; }
}
```

Too much thinking for the poor browser to do

:white_check_mark:

```javascript

function example(…) {
    return condition1 ? value1
         : condition2 ? value2
         : condition3 ? value3
         : value4;
}
```

Looks very clean and easy to read :thumbsup:

#### Module path aliases

It's now possible to configure module aliases, for example a common pattern is aliasing certain directories to use absolute paths. An example:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"],
      "@/public/*": ["public/*"],
      "@/utils": ["utils"],
      "@/theme": ["theme"],
      "@/theme.config": ["theme.config.js"]
    }
  }
}
```

This way you can import your non-lazy loading modules way easier. It used to be this:

:no_entry_sign:

```javascript
import GravityForm from "../../../components/GravityForm";
```

But now you can just do:

:white_check_mark:

```javascript
import GravityForm from "@/components/GravityForm";
```

### CSS naming conventions:

Generally, there are 3 problems that CSS naming conventions try to solve:

- To know what a selector does, just by looking at its name
- To have an idea of where a selector can be used, just by looking at it
- To know the relationships between class names, just by looking at them

Let's start by stating to never use camelcases in CSS names:

:no_entry_sign:

```css
.redBox {
  border: 1px solid red;
}
```

:white_check_mark:

```css
.red-box {
  border: 1px solid red;
}
```

This is a pretty standard CSS naming convention. It is arguably more readable. Also, it is consistent with the CSS property names.

### The BEM Naming Convention:

We want to keep it clean and simple, so I've decided to go for BEM (Block, Elements, Modifiers). It's clean and pretty straightforward. Take a look at these examples of a stick-man figure:

main component (**B**lock):

```css
.stick-man {
}
```

child components (**E**lements):

```css
.stick-man__head {
}
.stick-man__arms {
}
.stick-man__feet {
}
```

modifications in elements (**M**odifiers):

```css
.stick-man--red {
}
.stick-man__arms--long {
}
.stick-man__feet--short {
}
```

That's about it!

### CSS for JS

One last thing; whenever CSS class is used to target in JS, make sure that's clear just by looking at its name:

:no_entry_sign:

```javascript
const nav = document.querySelector(".site-navigation");
```

:white_check_mark:

```javascript
const nav = document.querySelector(".js-site-navigation");
```

## Thank you for reading!

We will keep updating this style guide, so keep an eye out for any changes!

Version: **1.5**
Authors: **Giovanni Beijl & David Tuk**
Last revision: **12/01/2021**

### A small secret :relieved:

We are preparing Glamrock to run buttery smooth on React 17.0.
We will update the style guide accordingly whenever we made that jump. :rocket:
