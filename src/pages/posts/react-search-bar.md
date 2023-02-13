---
layout: "../../layouts/PostLayout.astro"
title: Create a Fully Featured React Search Bar
preview:
  description: Learn how to create a fully featured search bar in React with keyboard navigation, debouncing, and search handling.
  imageUrl: https://images.unsplash.com/photo-1623603807271-21a9cbb295bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1421&q=80
meta:
  description: A guide on how to create a fully featured search bar in React with keyboard navigation, debouncing, and filtering.
published: January 1st, 2023
---

Search bars are essential components we use on most websites but they're harder to implement in React than you might think.

There are many existing libraries that do a good job of giving you searchbar/combobox components like 
<a href="https://www.npmjs.com/package/react-select-search" target="_blank" rel="noreferrer">
react-select-search</a> or
<a href="https://www.npmjs.com/package/react-select" target="_blank" rel="noreferrer">react-select</a>.
Most component libraries also have their own combobox/select components that can be used as search bars.

Or you could go the headless route with libraries like <a href="https://www.npmjs.com/package/downshift" target="_blank" rel="noreferrer">downshift</a> or <a href="https://www.npmjs.com/package/@headlessui/react" target="_blank" rel="noreferrer">headlessui</a>.

These are all great libraries that can and should be used if it fits your needs. However, maybe you want to reduce your dependencies or just are interested in how it can be made yourself.

### What Users Expect

- Provide dynamic suggestions in some kind of dropdown.
- Be keyboard navigable.
- Responsive and fast.

[insert image of popular serach bars]

### What Devs want
- Accessibility
- Type aware filtering
- Debouncing (avoid overloading your API)
- Loading state handling

### Starting

I'm going to assume you already have a React project running as there are plenty of tutorials for that available. We'll start out with a <code className="inline">SearchBar.tsx</code> file containing our starting layout: a container, input, and results. Let's also add on the basic input binding logic.

```jsx
// SearchBar.tsx
import { ChangeEvent, useState } from "react";

export function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="container">
      <input
        type="search"
        placeholder="Search here"
        className="search"
        onChange={handleChange}
      />
      <div className="results">Results Appear here</div>
    </div>
  );
}
```

Here's the CSS:
```css
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: transparent;
  width: 400px;
  height: fit-content;
  color: black;
}

.search {
  width: 400px;
  padding: 10px;
  font-size: 1.1em;
  color: inherit;
  background: whitesmoke;
}

.results {
  position: absolute;
  display: flex;
  width: 400px;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 50px;
  padding: 20px;
  background: whitesmoke;
  color: inherit;
  list-style: none;
}

.results li {
  cursor: pointer;
  width: 100%;
  text-align: start;
}

.results li:hover, li:focus-visible {
  background: rgb(157, 218, 222);
}

```
Now we should have something that looks like this (don't worry if it doesn't look exactly the same, some of it will be used later):

<img src="/react-search-bar/search-bar-1.png" alt="Starting search bar appearance" />

### Searching and displaying results
Let's start with the component props. To keep the component reusable, we will keep the results outside of the component and accept them as a prop. Passing in generic <code className="inline">TResults</code> and a function that returns a string let's us use any type of object as options. We also need to pass in a way to handle search events that takes the inner state of the input as a parameter.

```jsx
// SearchBar.tsx
interface Props<TResults = unknown> {
  results: TResults[];
  getLabel: (option: TResults) => string;
  onSearch: (input: string) => void;
}
```

For now we will trigger the <code className="inline">onSearch</code> event handler on change and change the results container to a list element that displays all results.

```jsx
// SearchBar.tsx
export function SearchBar<T>({ results, getLabel, onSearch }: Props<T>) {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="container">
      <input
        type="search"
        placeholder="Search here"
        className="search"
        onChange={handleChange}
      />
      <ul className="results">
        {results.map((v) => {
          return <li tabIndex={-1}>{getLabel(v)}</li>;
        })}
      </ul>
    </div>
  );
}
```

For our demo, we'll search through a catalogue of people by their name. On search, we'll update a filter value that which our search results come from. Typescript takes our generic type and understands what properties we can filter from.

```jsx
// App.tsx
  const [people, setPeople] = useState([
    { name: "Mark", role: "Admin" },
    { name: "Carter", role: "Manager" },
    { name: "Peggy", role: "Engineer" },
    { name: "Florence", role: "New Hire" },
  ]);

  const [filter, setFilter] = useState("");

  const searchRes = useMemo(() => {
    if (filter.length > 0) {
      return people.filter((person) => person.name.includes(filter));
    }
    return people;
  }, [people, filter]);

  const handleSearch = (input: string) => {
    setFilter(input);
  };

  return (
    <main>
      <SearchBar
      results={searchRes}
      getLabel={(o) => o.name}
      onSearch={handleSearch}
      /> 
    </main> 
  )
```

Now we have a pretty basic working search bar that is filtering names by whether they contain our search!

<img src="/react-search-bar/search-bar-2.png" alt="Starting search bar appearance" />

### Handling selection
Selection is also pretty simple at first. We just need to add an <code classname="inline">onClick</code> handler to the items and an onSelect parameter to the props.

```jsx
interface Props<TResults = unknown> {
  results: TResults[];
  getLabel: (option: TResults) => string;
  onSearch: (input: string) => void;
  onSelect: (value: TResults) => void;
}

export function SearchBar<T>({
  results,
  getLabel,
  onSearch,
  onSelect,
}: Props<T>) {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="container">
      <input
        type="search"
        placeholder="Search here"
        className="search"
        onChange={handleChange}
      />
      <ul className="results">
        {results.map((v) => {
          return (
            <li role="button" tabIndex={-1} onClick={() => onSelect(v)}>
              {getLabel(v)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```
For accessibility, we provide the button role to each list item so screen readers can know they are clickable.