# Vytváření webových aplikací v Reactu

- Začátek: 18:05
- Přestávka (10 minut): 19:30 - 19:40
- Struktura
  - Intro
  - 6 navazujících bloků
  - Každý blok
    - ~= 30 minut
    - Teoretický úvod
    - Praktická ukázka
    - Krátké samostatné cvičení

---

## HTML + CSS + JavaScript ~= Webová aplikace @Honza

- Webové stránky a aplikace se skládají z několika částí
  - HTML - obsah
  - CSS - Vzhled
  - JavaScript - interaktivita/změny

### HTML

```html
<html>
  <head>
    <title>Testovací stránka</title>
  </head>
  <body>
    <div>
      <header>
        Logo
      </header>
      <div>
        Obsah
      </div>
      <footer>
        MIT License
      </footer>
    </div>
  </body>
</html>
```

### CSS

```css
h1 {
  color: blue;
}
```

### Javascript

```js
document.getElementsByTagName('input')[0].value = 'abc'
```

or

```js
$('input').val('abc')
```

> Ukázka 0: [00-no-react/index.html](./src/exercises/00-no-react/index.html)

---

## React - Hello World @honza 30 mins

- JavaScriptová knihovna pro tvorbu uživatelských rozhraní
- Kombinuje JavaScript a HTML => JSX
- Komponenty
  - Hlavní stavební bloky
  - Lze je vytvářet dvěma hlavními způsoby

*pomocí tříd - tzv. "class component"*

```js
class Search extends React.Component {
  render() {
    return (
      <div>Search</div>
    );
  }
}
```

*pomocí funkcí - tzv. "function component"*

```js
function Search() {
  return (
    <div>Search</div>
  );
}
```

V Reactu se často používá alternativní způsob zápisu funkce, a to pomocí šipkové notace ("arrow function").
Tento kód je (až na malé rozdíly, ktefé pro teď ignorujeme) ekvivalentí zápisu výše.

```js
const Search => () {
  return (
    <div>Search</div>
  );
}
```

* Zanořování (skládání) komponent

```js
const SearchButton => () {
  return (
    <button><i className="search-icon" />Search</button>
  );
}

const Search => () {
  return (
    <input placeholder="search" />
    <SearchButton />
  );
}

```

> Ukázka 1: [01-hello-world/App.jsx](./src/exercises/01-hello-world/App.jsx)
> - Add few static search results shown in a `<table></table>`

> Cvičení 1:
> - Extrahuj `<input>` do samostatné komponenty `SearchInput`
> - Přesuň 2 tlačítka `<button>` do zvláštní komponenty `SearchButtons`

> Key Takeways:
> * React je knihovna pro vytváření UI pomocí komponent
> * Komponenty můžeme skládat/vnořovat do sebe
> * V reactu nevytváříme UI v HTML, ale JSX, což je HTML v JavaScriptu
> * Máme několik způsobů, jak vytvořit komponentu - `Class`, `function`

---

## Props @kuba 30 mins

### K čemu jsou propsy a jak je používat

Dobrým zvykem v Reactu je mít co nejmenší komponenty, které přepoužíváme na různých místech a skládáme
je do sebe. Začneme-li ale vytvářet obecnější komponenty, začneme také potřebovat způsob, jak komponentám
předat informace.

K tomu v Reactu používáme tzv. "propsy" - jsou to informace, které komponentě řeknou, co má vykreslit.

Řekněme například, že chceme vytvořit seznam studentů ve třídě i s obrázky a odkazy na sociální sítě.

```jsx
class StudentsList extends React.Component {
  render() {
    return (
      <div className="students-list">
        <div className="students-list__item-wrapper">
          <img className="students-list__profile-image" src="./public/james-bond.jpg" />
          <a href="https://www.friendface.com/james-bond" className="students-list__friendface-link">
            <div className="students-list__name">James Bond</div>
          </a>
        </div>
        <div className="students-list__item-wrapper">
          <img className="students-list__profile-image" src="./public/bruce-wayne.jpg" />
          <a href="https://www.friendface.com/bruce-wayne" className="students-list__friendface-link">
            <div className="students-list__name">Bruce Wayne</div>
          </a>
        </div>
        <div className="students-list__item-wrapper">
          <img className="students-list__profile-image" src="./public/lara-croft.jpg" />
          <a href="https://www.friendface.com/lara-croft" className="students-list__friendface-link">
            <div className="students-list__name">Lara Croft</div>
          </a>
        </div>
      </div>
    );
  }
}
```

Můžeme si všimnout, že v **kódu se hodně opakujeme** - to je obvykle známka, že je třeba extrahovat opakující
se kód do komponenty a tu přepoužít.

> **DRY (Don't Repeat Yourself)** je jedním ze základních principů programování. Ten říká, že bychom se v kódu
> neměli opakovat - jakmile duplikujeme nějaký kód, znamená to, že jakoukoli jeho úpravu budeme také muset
> provést vícekrát. Náš kód se tak stává špatně udržitelným a náchylným k chybám. Duplikaci logiky bychom se měli
> vyhýbat jejím extrahováním do samostaných funkcí nebo komponent.
> ![Don't Repeat Yourself](./public/dry.png)

Rozhodneme se tedy vytvořit komponentu `<Student />`, které ale budeme potřebovat předat vždy tři informace:
jméno, link profilového obrázku a odkaz na sociální síť. To provedeme pomocí propsů:

```jsx
class StudentsList extends React.Component {
  render() {
    return (
      <div className="students-list">
        <Student name="James Bond" profileImage="./public/james-bond.jpg" friendfacePath="/james-bond" />
        <Student name="Bruce Wayne" profileImage="./public/bruce-wayne.jpg" friendfacePath="/bruce-wayne" />
        <Student name="Lara Croft" profileImage="./public/lara-croft.jpg" friendfacePath="/lara-croft" />
      </div>
    );
  }
}
```

To je mnohem přehlednější. Zbývá už jen implementovat komponentu `<Student />` a použít v ní poskytnuté informace:

```jsx
class Student extends React.Component {
  render() {
    // V class komponentě jsou propsy přístupné přes this.props a lze je jen číst, nejde je přepisovat
    const {name, profileImage, friendfacePath} = this.props;

    // Stojí za povšimnutí: proměnné používáme ve složených závorkách
    return (
      <div className="students-list__item-wrapper">
        <img className="students-list__profile-image" src={profileImage} />
        <a href={`https://www.friendface.com/${friendfacePath}`} className="students-list__friendface-link">
          <div className="students-list__name">{name}</div>
        </a>
      </div>
    );
  }
}
```

> **Destrukturování** je způsob, jakým lze v moderním JavaScriptu definovat proměnnou a zároveň jí
> přiřadit vlastnost nějakého objektu. Například
>
> ```js
> const color = shape.color;
> const size = shape.size;
> ```
>
> je to samé, jako
>
> ```js
> const {color, size} = shape;
> ```
>
> Destruturovat lze i pole:
>
> ```js
> const myFavoriteNumber = myFavoriteNumbers[0];
> const mySecondFavoriteNumber = myFavoriteNumbers[1];
> ```
>
> je to samé, jako
>
> ```js
> const [myFavoriteNumber, mySecondFavoriteNumber] = myFavoriteNumbers;
> ```
>
> **Template literal** nebo také "template string" je alternativní způsob zadávání textových řetězců v moderním
> JavaScriptu pomocí zpětných uvozovek. Uvnitř těchto uvozovek lze jednoduše používat hodnoty proměnných, je však
> třeba je zabalit do `${}`
>
> ```js
> const name = "Fantomas";
> const message = `Byl jsem zde, ${name}!`;
> ```

### Předávání funkcí

Pomocí propsů můžeme předat jakýkoli typ. Je velice časté, že dceřinné komponentě předáme funkci, kterou chceme,
aby ta komponenta v určitou chvíli vykonala - tzv. "callback".

```jsx
class Student extends React.Component {
  render() {
    const {name, onClick} = this.props;

    // Stojí za povšimnutí - definujeme anonymní funkci inline
    return (
      <div className="students-list__item-wrapper" onClick={() => onClick(name)}>
        <img className="students-list__profile-image" src={profileImage} />
        <div className="students-list__name">{name}</div>
      </div>
    );
  }
}

class StudentsList extends React.Component {
  // Stojí za povšimnutí - používáme šipkovou notaci
  handleStudentClick = (name) => {
    console.log(name);
  }

  render() {
    return (
      <div className="students-list">
        <Student name="James Bond" onClick={this.handleStudentClick} />
        <Student name="Bruce Wayne" onClick={this.handleStudentClick} />
        <Student name="Lara Croft" onClick={this.handleStudentClick} />
      </div>
    );
  }
}
```

### Bonus: children

V Reactu je `children` speciální propsa, kterou nepředáváme standardním způsobem, ale React nám
ji předá automaticky - jedná se o komponenty, které jsou v té naší zabalené.

```jsx
<StudentsList>
  <div>Student 1</div>
  <div>Student 1</div>
  <div>Student 1</div>
</StudentList>
```

```jsx
class StudentsList extends React.Component {
  render() {
    const {children} = this.props;

    return (
      <div className="students-list">
        {children}
      </div>
    );
  }
}
```

> [Cvičení 2](./src/exercises/02-props/App.jsx)

Poznámky:

- Nesmíme zapomínat na importování Reactu v JSX souborech, i když tuto proměnnou explicitně nepoužíváme
- Každá komponenta vytvořená jako třída (class component) musí mít metodu `render`
- CSS lze vkládat mnoha způsoby. Nejjednodušší je přímý import css modulů. Pozor na `class` vs `className`

---

## State @honza

* "Memory" in which we can save variable values
  * Form values
  * State of dynamic elements - open/close, hidden/visible
  * Information about anything dynamic
* Components re-render when state changes
* !!! Always change the whole state object, not only its values !!!
* Several ways how to use state:


*class constructor*

```jsx
class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: 'abc'
    };
  }

  render() {
    return (
      <div>Search {this.state.searchText}</div>
    );
  }
}
```

*class field*

```jsx
class Search extends React.Component {

  state = {
    searchText: 'abc'
  }

  render() {
    return (
      <div>Search {this.state.searchText}</div>
    );
  }
}
```

*seting state in class*
```jsx
this.setState({searchText: 'cde'})
```

but NEVER
```jsx
this.state.searchText = 'cde'
// OR
this.state.setState(this.state)
```

> #### Virtual DOM
> Ukazka 3:
> * DOM vs Virtual DOM
> * Re-rendering
> ![](https://i2.wp.com/programmingwithmosh.com/wp-content/uploads/2018/11/lnrn_0201.png?ssl=1)



*hook*
```jsx
const Search => () {

  const [searchText, setSearchText] = useState('abc');

  return (
    <div>Search {searchText}</div>
  );
}
```

*seting state with hook*
```jsx
const [searchText, setSearchText] = useState('abc');

setSearchText('cde')
```

* dummy and smart components
  * to prevent messy state all over the place
  * some components intentionally does not have any state but rather accepts it from parent components through props - dummy
  * some components keep state for other components - smart

> Cvičení 3:
> - SMART App.jsx and dummy SearchInput.jsx and SearchResults.jsx

> Key Takeways:
> * State slouží k uchování proměnlivého stavu komponent
> * Opět máme několik možností, jak State použít - `constructor`, class field, hook
> * State nikdy neměníme, ale vžy vytváříme nový. To proto, aby React poznal, kdy má překreslit komponentu
> * React používá Virtual DOM, aby zjistil, jakou část UI je třeba překreslit

---

## Získávání dat ze serveru

V běžném světě nemíváme v React aplikaci rovnou k dispozici data (například výsledky vyhledávání). Zpravidla
si tato data musíme stáhnout až na základě nějaké akce uživatele. K tomu se používá API, které běží někde na
serveru a má přístup například do databáze.

> API je zkratka pro Application Programming Interface a jedná se o rozhraní, díky kterému spolu mohou různé
> aplikace komunikovat mezi sebou. Ve webovém vývoji je asi nejčastější
> [REST API](https://www.itnetwork.cz/programovani/nezarazene/stoparuv-pruvodce-rest-api), které umožňuje
> jednoduše vytvářet, číst, editovat nebo mazat (CRUD operace - Create, Read, Update, Delete) data na serveru
> pomocí HTTP volání.

V našem případě uživatel zadá do vstupního pole nějaký text a následně klikne na tlačítko hledat. V tu chvíli
chceme poslat dotaz společně s hledaným výrazem na server, ten z databáze vyfiltruje záznamy podle předaného
dotazu a pošle zpátky odpověd jen s relevantími výsledky.

Tyto akce jsou asynchronní - nějaký čas trvá, než se náž dotaz zpracuje a vrátí se s výsledky. V živatelském
rozhraní tak potřebujeme zpravidla:

- odeslat dotaz na server
- zobrazit indikaci načítání (loading)
- zachytit výsledky dotazu
- uložit výsledky do lokálního stavu a zobrazit je
- případně zobrazit chybu, pokud dotaz selže

### Fetch

> `fetch()` je funkce, která je globálně dostupná ve většině moderních prohlížečích, která slouží k posílání
> http requestů. Akceptuje dva argumenty - prvním (povinným) je URL adresa dotazu a druhým (volitelným)
> parametrem je objekt s dodatečnými informacemi a konfigurací.
> Více si můžete přečíst [zde](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

```js
// Každou funkci, ve které používáme "await", musí být označena jako asynchronní pomocí slova "async"
const fetchJokes = async () => {
  // REST API s vtipy o Chucku Norrisovi
  const url = "https://api.chucknorris.io/jokes/search?query=world";

  try {
    // Volání funkce fetch vrací promise, musíme tedy použít await, abychom řekli kódu, že má počkat na výsledek
    const response = await fetch(url, {
      method: 'GET', // GET (default), POST, PUT, DELETE, ...
      mode: 'cors', // cors (default), no-cors, same-origin
      cache: 'no-cache', // default (default), no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json' // 'application/x-www-form-urlencoded', ...
        // ...
      },
      // ...
    })
    // po úspěšném vrácení HTTP dotazu získáme objekt typu response, který ještě musíme zpracovat podle toho,
    // jaký typ odpovědi očekáváme, například response.json() nebo response.text()
    // Volání funkce .json() vrací také promise, musíme tedy opět pomocí await počkat, až se resolvne
    const responseJSON = await response.json();

    // Nyní můžeme výsledek vypsat do konzole
    console.log(responseJSON.result);
  } catch (error) {
    // Kdekoli v řetězci volání funkcí může nastat chyba - její zachycení si zajistíme pomocí catch()
    console.error(error);
  }
};
```

Jak zavolat API endpoint a zpracovat jeho výsledek je názorně ukázáno v [příkadu](./src/examples/fetch/App.jsx)

> [Cvičení 4](./src/exercises/04-api/App.jsx)

---

## React Router @honza 30 mins

* routing
  * server side routing
    user -> open a link -> browser send an request to server -> server creates an response -> send it back to user
  * client side rendering
    user -> open a link -> javascript handle the link click -> javascript renders a different component
* moders browsers has a functions for manipulating with URL
* React Router
  * https://reactrouter.com/web/guides/quick-start
  * special kind of component for navigation in an app
  * not part of React

```jsx
<Router>
  <div>
    <ul>
      <li>
        <Link to="/">Search</Link>
      </li>
      <li>
        <Link to="/gmail">Gmail</Link>
      </li>
    </ul>

    <Switch>
      <Route exact path="/">
        <Search />
      </Route>
      <Route path="/gmail">
        <Gmail />
      </Route>
    </Switch>
  </div>
</Router>
```

> Ukázka 5a: 05-router/App.jsx
> - Add new Gmail component
> - Use existing Gmail link to navigate to this component

* Routes evaluation
  * useful for 404 pages
* URL parametres
  * it is possible to pass parametres to an URL


> Ukázka 5b: 05-router/App.jsx
> - Move search results to a new page
> - Add 404 error page

> Cviceni 5:
> - Add AboutUs.jsx page
> - Add new menu item with link to About Us

---

## Create React App (CRA) @kuba

Chceme-li rychle a snadno vytvořit React aplikaci se základním nastavením tak, abychom mohli rovnou začít vyvíjet a
nezabývali se nastavováním a konfigurací, můžeme použít `create-react-app` (CRA) balíček, který nám vytvoří adresář a
do něj nainstaluje a nakonfiguruje React.

Nejdříve je vhodné mít globálně nainstalovaný `npx` balíček, pokud jej ještě nainstalovaný nemáme:

```bash
npm install -g npx
```

Následně už můžeme nainstalovat samotnou React aplikaci pomocí příkazů:

```bash
npx create-react-app my-app
cd my-app
npm start
```

kde `my-app` je libovolné jméno naší aplikace.

CRA za nás řeší spoustu problémů tak, abychom se mohli soustředit na vývoj aplikace samotné, například bundlování.

### Vkládání obrázků

Máme-li aplikaci vytvořenou pomocí CRA, stačí obrázky standardním způsobem importovat do naší komponenty a importovanou
proměnnou použít jako URL daného obrázku. O nic víc se nemusíme starat:

```jsx
import myImage from './image.svg';

class MyComponent extends React.Component {
  render() {
    return <img src={myImage} />;
  }
};
```

### Vkládání CSS souborů

Stejně jednoduše lze vkládat i CSS soubory do našich komponent - stačí je jen importovat:

```jsx
import './myComponentStyles.css';

class MyComponent extends React.Component {
  render() {
    return <div className="class-in-css-file" >Open the door, Hal!</div>;
  }
};
```
