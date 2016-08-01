// Start: Calculating Surrogate Pairs
 var High_Surrogate = function(Code_Point){ return Math.floor((Code_Point - 0x10000) / 0x400) + 0xD800 };
 var Low_Surrogate  = function(Code_Point){ return (Code_Point - 0x10000) % 0x400 + 0xDC00 };

 // Reverses The Conversion
 var Code_Point = function(High_Surrogate, Low_Surrogate){
	return (High_Surrogate - 0xD800) * 0x400 + Low_Surrogate - 0xDC00 + 0x10000
 };



 > var codepoint = 0x1F4A9;   								// 0x1F4A9 == 128169
 > High_Surrogate(codepoint).toString(16)
 "d83d"  													// 0xD83D == 55357
 > Low_Surrogate(codepoint).toString(16)
 "dca9"  													// 0xDCA9 == 56489

 > String.fromCharCode(  High_Surrogate(codepoint) , Low_Surrogate(codepoint) );
  "💩"
> String.fromCodePoint(128169)
  "💩"
 > '\ud83d\udca9'
  "💩"
// END




// START: Variable identifiers can effectively include whitespace!
// The **U+3164 HANGUL FILLER** character displays as an advancing whitespace character. The character is rendered as completely invisible (and non advancing, i.e. "zero width"), if not explicitly [supported in rendering](http://unicode.org/faq/unsup_char.html). That means the ugly character replacement (�) symbol should never be displayed.
> var ᅟ = 'foo';
undefined
> ᅟ
'foo'


> var ㅤ= alert;
undefined
> var foo = 'bar'
undefined
> if ( foo ===ㅤ`baz` ){} 	// alert
undefined


> var varㅤfooㅤ\u{A60C}ㅤπ = 'bar';
undefined
> varㅤfooㅤꘌㅤπ
'bar'

// END




// START: Modifiers
> 'a'
 "a"

> 'a\u{0308}'
 "ä"

> 'a\u{20DE}\u{0308}'
 "a⃞̈"

> 'a\u{20DE}\u{0308}\u{20DD}'
 "a⃞̈⃝"

// Modifying Invisible Characters
> '\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}'
 "‎‎‎‎‎‎‎‎‎‎"

> '\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}'.length
 10
// END




// START
// In general, characters designated the [ID_START](https://codepoints.net/search?IDS=1) property may be used at the beggining of a variable name. Characters designated with the [ID_CONTINUE](https://codepoints.net/search?IDC=1) property may be used after the first character of a variable.

function rand(μ,σ){ ... };

String.prototype.reverseⵑ = function(){..};

Number.prototype.isTrueɁ = function(){..};

var WhatDoesThisDoɁɁɁɁ = 42
// END




// START: 
// Here are some really creative variable names from Mathias Bynes, https://mathiasbynens.be/notes/javascript-identifiers#examples

// How convenient!
var π = Math.PI;

// Sometimes, you just have to use the Bad Parts of JavaScript:
var ಠ_ಠ = eval;

// Code, Y U NO WORK?!
var ლ_ಠ益ಠ_ლ = 42;

// How about a JavaScript library for functional programming?
var λ = function() {};

// Obfuscate boring variable names for great justice
var \u006C\u006F\u006C\u0077\u0061\u0074 = 'heh';

// …or just make up random ones
var Ꙭൽↈⴱ = 'huh';

// While perfectly valid, this doesn’t work in most browsers:
var foo\u200Cbar = 42;

// This is *not* a bitwise left shift (`<<`):
var 〱〱 = 2;
// This is, though:
〱〱 << 〱〱; // 8

// Give yourself a discount:
var price_9̶9̶_89 = 'cheap';

// Fun with Roman numerals
var Ⅳ = 4;
var Ⅴ = 5;
Ⅳ + Ⅴ; // 9

// Cthulhu was here
var Hͫ̆̒̐ͣ̊̄ͯ͗͏̵̗̻̰̠̬͝ͅE̴̷̬͎̱̘͇͍̾ͦ͊͒͊̓̓̐_̫̠̱̩̭̤͈̑̎̋ͮͩ̒͑̾͋͘Ç̳͕̯̭̱̲̣̠̜͋̍O̴̦̗̯̹̼ͭ̐ͨ̊̈͘͠M̶̝̠̭̭̤̻͓͑̓̊ͣͤ̎͟͠E̢̞̮̹͍̞̳̣ͣͪ͐̈T̡̯̳̭̜̠͕͌̈́̽̿ͤ̿̅̑Ḧ̱̱̺̰̳̹̘̰́̏ͪ̂̽͂̀͠ = 'Zalgo';
// END




/* Start
   If you want to rename all your HTML tags to what appears as nothing, the following script is just what your looking for.
   *Do note however that HTML does not support all unicode characters.*
*/

// U+1160 HANGUL JUNGSEONG FILLER
transformAllTags('ᅠ');

// An actual HTML element node designed to look like a comment node, using the U+01C3 LATIN LETTER RETROFLEX CLICK 
//	<ǃ-- name="viewport" content="width=device-width"></ǃ-->
transformAllTags('ǃ--');

// or even <ᅠ⃝
transformAllTags('\u{1160}\u{20dd}');

// and for a bonus, all existing tag names will have each character ensquared. h⃞t⃞m⃞l⃞
transformAllTags();


function transformAllTags (newName){
   // querySelectorAll doesn't actually return an array.
   Array.from(document.querySelectorAll('*'))
     .forEach(function(x){
         transformTag(x, newName);
   });
}

function wonky(str){
  return str.split('').join('\u{20de}') + '\u{20de}';
}

function transformTag(tagIdOrElem, tagType){
    var elem = (tagIdOrElem instanceof HTMLElement) ? tagIdOrElem : document.getElementById(tagIdOrElem);
    if(!elem || !(elem instanceof HTMLElement))return;
    var children = elem.childNodes;
    var parent = elem.parentNode;
    var newNode = document.createElement(tagType||wonky(elem.tagName));
    for(var a=0;a<elem.attributes.length;a++){
        newNode.setAttribute(elem.attributes[a].nodeName, elem.attributes[a].value);
    }
    for(var i= 0,clen=children.length;i<clen;i++){
        newNode.appendChild(children[0]); //0...always point to the first non-moved element
    }
    newNode.style.cssText = elem.style.cssText;
    parent.replaceChild(newNode,elem);
}
// END




// START: Here is what it does support:
function testBegin(str){
 try{
    eval(`document.createElement( '${str}' );`)
    return true;
 }
 catch(e){ return false; }
}

function testContinue(str){
 try{
    eval(`document.createElement( 'a${str}' );`)
    return true;
 }
 catch(e){ return false; }
}
// END




// START: And heres some basic results
// Test if dashes can start an HTML Tag
> testBegin('-')
< false

> testContinue('-')
< true

> testBegin('ᅠ-')	// Prepend dash with U+1160 HANGUL JUNGSEONG FILLER
< true
// END
