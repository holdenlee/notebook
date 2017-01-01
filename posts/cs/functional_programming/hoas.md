---
title: Higher-order abstract syntax
published: 2016-12-26
modified: 2016-12-26
tags: haskell, functional programming
type: programming
showTOC: True
---

# HOAS

Higher-order abstract syntax (abbreviated HOAS) is a technique for the representation of abstract syntax trees for languages with variable binders. [wikipedia](https://en.wikipedia.org/wiki/Higher-order_abstract_syntax)

Compared to FOAS (which are basically just normal abstract syntax trees), HOAS exposes additional structure: the relationship between variables and their binding sites.

(What is a binding site?)

In HOAS, `let` is a function `exp -> (exp -> exp) -> exp`.
```haskell
let x = 1 + 2 in x + x
```
becomes
```
let (1 + 2) (\x -> x + x)
```

To reason about these expressions as data, limit `exp -> exp` to "nice" functions. PHOAS is a solution.

[SE](http://cstheory.stackexchange.com/questions/20071/what-is-higher-order-in-higher-order-abstract-syntax)

# Rotten bananas

Encoding a language that binds variables in higher order abstract syntax generally involves constructing an abstract data type that contains functions. [Rotten bananas](http://comonad.com/reader/2008/rotten-bananas/) [h](http://scrible.com/s/4JQM6)
<!-- [h](http://scrible.com/s/6BQM6)-->

An exponential functor:
```haskell
class ExpFunctor f where
    xmap :: (a -> b) -> (b -> a) -> f a -> f b
```

We know from [catamorphism](catamorphism.html): (`old` is `unFix`)
```haskell
newtype Nu f  = Nu { old :: f (Nu f) }
 
class Cata f t | t -> f where
    cata :: (f a -> a) -> t -> a
 
instance Functor f => Cata f (Nu f) where
    cata f = f . fmap (cata f) . old
```
Catamorphism for exponential functor:
```haskell
cataMH :: ExpFunctor f => (f a -> a) -> (a -> f a) -> Nu f -> a
cataMH f g = f . xmap (cataMH f g) (anaMH f g) . old
 
anaMH :: ExpFunctor f => (f a -> a) -> (a -> f a) -> a -> Nu f
anaMH f g = Nu . xmap (anaMH f g) (cataMH f g) . g
```

To get a catamorphism for the fixpoint of an exponential functor, you need both a folding and unfolding operation. "To use the Meijer/Hutton catamorphism to write a pretty printer, you have to write a parser as well; to use it to eval, you must also be able to reify values back into programs."

Actually, you don't need a full inverse, just a right-inverse such that `cata f . place = id`. Put the Place term into an explicit recursion ADT (Roll is just Fix):
```
data Rec f a = Roll (f (Rec f a)) | Place a
```
Now we can define a catamorphism:
```
cataFS :: ExpFunctor f => (f a -> a) -> Rec f a -> a
cataFS f (Roll x) = f (xmap (cataFS f) Place x)
cataFS f (Place x) = x
```

# PHOAS

[PHOAS for free](https://www.schoolofhaskell.com/user/edwardk/phoas)

# Misc

From Rotten Bananas:

fmap can really only be defined for 'covariant endofunctors on the category of types' (?)

Most covariant functors used in Haskell are among the so-called 'polynomial' functors, meaning that they can be built up out of sums, products and constants.

That said, polynomial functors are not the only covariant functors, because you can also have some functions in the type, as long as the type over which you are parameterized only occurs in 'positive' position. The informal way to think about it is that every time you have a parameter on the left of an (->) in the type, the occurrence switches signs, starting positive, so for some Functors, you can have functions, as long as the parameter occurs only in positive positions. 

[Free monads for less](http://comonad.com/reader/2011/free-monads-for-less/)
