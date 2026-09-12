// ===============================
// E3: JavaScript Starter File
// ===============================
//
// The assignment page is the authoritative specification.
// This file provides function stubs and sample usage for testing.

// Problem 1
/**
 * @param {string[]} titles
 * @returns {string[]}
 */
// Assumption, the words are separated by only one space and have no extra spaces in front or back.
function generateIds(titles) {
    // TODO: implement
    return titles.map(title => title.toLowerCase().split(" ").join("-"));
}

// Problem 2
/**
 * @param {string[]} titles
 * @returns {string[]}
 */
// Assumption, the words are separated by only one space and have no extra spaces in front or back.
// Assumption, the title needs to include word important case insensitive.
function highlightImportant(titles) {
    // TODO: implement
    return generateIds(titles.filter(title => title.toLowerCase().includes("important")));
}

// Problem 3
/**
 * @param {string[]} titles
 * @returns {Object}
 */
// Assumption, the words are separated by only one space and have no extra spaces in front or back.
function wordFrequency(titles) {
    // TODO: implement
    let words = new Map();
    titles.forEach(title => title.toLowerCase().split(" ").map(word => words.has(word) ? words.set(word, words.get(word) + 1) : words.set(word, 1)));
    //titles.join(" ").toLowerCase().split(" ").map(word => words.has(word) ? words.set(word, words.get(word) + 1) : words.set(word, 1));
    return words;
}

// Problem 4
/**
 * @param {string[]} menu
 * @param {string} item
 * @returns {string[]}
 */
function addMenuItem(menu, item) {
    // TODO: implement
    let newMenu = [...menu];
    newMenu.push(item);
    return newMenu;
}

// Problem 5
/**
 * @param {string} message
 * @param {(msg: string) => string} formatter
 * @returns {void}
 */
function showFormattedMessage(message, formatter) {
    // TODO: implement
    console.log(formatter(message));
}

// Problem 6
/**
 * @param {string[]} items
 * @param {(item: string) => string} formatter
 * @returns {string[]}
 */
function formatMenu(items, formatter) {
    // TODO: implement
    return items.map(item => formatter(item));
}

// Problem 7
/**
 * @param {Object} user
 * @param {Object} updates
 * @returns {Object}
 */
function updateUser(user, updates) {
    // TODO: implement
    return {...user, ...updates};
}

// Problem 8
/**
 * @param {Object} user
 * @returns {Object}
 */
function removeSensitive(user) {
    // TODO: implement
    let {password, ...publicUser} = user;
    return publicUser;
}

// Problem 9
/**
 * @param {...Object} profiles
 * @returns {Object}
 */
function mergeProfiles(...profiles) {
    // TODO: implement
    let newProfile;
    profiles.forEach(profile => newProfile = {...newProfile, ...profile});
    return newProfile;
}

// Problem 10
/**
 * @param {Object[]} sections
 * @param {(title: string) => string} formatter
 * @returns {Object[]}
 */
function buildNavigation(sections, formatter) {
    // TODO: implement
    let highPrioritySections = sections.filter(section => section.priority > 2)
    let miniNav = highPrioritySections.map(section => ({
        id: section.title.toLowerCase().split(" ").join("-"),
        label: formatter(section.title),
        classes: section.classes
    }));
    return miniNav;
}


// ===============================
// Sample Usage / Testing
// ===============================

// Problem 1
console.log(generateIds(["About Us", "Our Projects", "Contact Info"]));
// Expected: ["about-us", "our-projects", "contact-info"]

// Problem 2
console.log(highlightImportant([
    "About Us",
    "Important Notice",
    "Our Projects",
    "Very Important Update"
]));
// Expected: ["important-notice", "very-important-update"]

// Problem 3
console.log(wordFrequency([
    "About Us",
    "Our Projects",
    "Important Projects",
    "Contact Us"
]));
// Expected:
// { about: 1, us: 2, our: 1, projects: 2, important: 1, contact: 1 }

// Problem 4
const originalMenu = ["Home", "About"];
const newMenu = addMenuItem(originalMenu, "Contact");

console.log(newMenu);
// Expected: ["Home", "About", "Contact"]

console.log(originalMenu);
// Expected: ["Home", "About"]

// Problem 5
showFormattedMessage("hello world", msg => msg.toUpperCase());
// Expected: HELLO WORLD

showFormattedMessage("new user joined", msg => "# " + msg + " #");
// Expected: # new user joined #

// Problem 6
console.log(formatMenu(
    ["Home", "About", "Contact"],
    item => item.toUpperCase()
));
// Expected: ["HOME", "ABOUT", "CONTACT"]

// Problem 7
const user = { name: "Maya", age: 25, city: "Boston" };
const updates = { age: 26, city: "New York" };
const updatedUser = updateUser(user, updates);

console.log(updatedUser);
// Expected: { name: "Maya", age: 26, city: "New York" }

console.log(user);
// Expected: { name: "Maya", age: 25, city: "Boston" }

// Problem 8
const user2 = { name: "Maya", age: 26, password: "secret123" };

console.log(removeSensitive(user2));
// Expected: { name: "Maya", age: 26 }

console.log(user2);
// Expected: { name: "Maya", age: 26, password: "secret123" }

// Problem 9
console.log(mergeProfiles(
    { name: "Maya", age: 25 },
    { age: 26 },
    { city: "NY" }
));
// Expected: { name: "Maya", age: 26, city: "NY" }

// Problem 10
const sections = [
    { title: "Home", priority: 1, classes: ["menu-item"] },
    { title: "Important Updates", priority: 3, classes: ["menu-item", "highlight"] },
    { title: "Contact", priority: 2, classes: ["menu-item"] }
];

console.log(
    buildNavigation(
        sections,
        title => "# " + title.toUpperCase() + " #"
    )
);

// Expected:
// [
//   {
//     id: "important-updates",
//     label: "# IMPORTANT UPDATES #",
//     classes: ["menu-item", "highlight"]
//   }
// ]
