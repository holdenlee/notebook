---
title: Haskell extensions
published: 2016-12-25
modified: 2016-12-25
tags: haskell, functional programming
type: notes
showTOC: True
---

* ConstraintKinds
    * [GHC](https://downloads.haskell.org/~ghc/7.8.4/docs/html/users_guide/constraint-kind.html)
	* TypeFamilies or GADTs allow equality constraints `a ~ Int`.
	* Tuples whose components have type `Constraint`.
	*   Anything declared to have type constraint:
		```
		type family Typ a b :: Constraint
		type instance Typ Int  b = Show b
		type instance Typ Bool b = Num b
		
		func :: Typ a b => a -> b -> b
		func = ...
		```
	* Allows type constraint synonyms `type Stringy a = (Read a, Show a)`
* DataKinds
	* Suitable (?) types (ex. algebraic data types) automatically get promoted to kinds. Here `Nat` goes from a type to a kind and `Ze` goes from a value of type `Nat`, to a type of kind `Nat`.
    *    Example:
	     ```
		 data Nat = Ze | Su Nat
		 data Vec :: * -> Nat -> * where
		   Nil  :: Vec a Ze
		   Cons :: a -> Vec a n -> Vec a (Su n)
		 ```
* DeriveFunctor
	* [SO](http://stackoverflow.com/questions/20336987/what-exactly-does-deriving-functor-do)
* FlexibleContexts
    * Allows non-type variables in constraints.
	<!--class arguments in contexts of type signatures and class declarations may be arbitrary types.-->
	* `g :: (C [a], D (a -> b)) => [a] -> b`
	* [Prime](https://prime.haskell.org/wiki/FlexibleContexts)
	* [SO](https://prime.haskell.org/wiki/FlexibleContexts)
* FunctionalDependencies
    * Specify that some parameters of a type class determine others.
	* `class Mult a b c | a b -> c`
	* `class Extract container elem | container -> elem`
	* [Wiki](https://wiki.haskell.org/Functional_dependencies)
* GADTs
	* [Wikibooks](https://en.wikibooks.org/wiki/Haskell/GADT)
	*   Example:
		```
		data List a where
		Nil  :: List a
		Cons :: a -> List a -> List a
	    ```
	*   Example that can't be done with regular ADTs:
	    ```
		data Expr a where
		I   :: Int  -> Expr Int
		B   :: Bool -> Expr Bool
		Add :: Expr Int -> Expr Int -> Expr Int
		Mul :: Expr Int -> Expr Int -> Expr Int
		Eq  :: Expr Int -> Expr Int -> Expr Bool
		```
* GeneralizedNewtypeDeriving
    * [Haskell](http://downloads.haskell.org/~ghc/7.8.4/docs/html/users_guide/deriving.html)
	* A newtype can derive anything from the type that it wraps. (Normally you'd have to write an instance, by unwrapping.)
* MultiParamTypeClasses
	* Type classes which can take multiple arguments. 
	* [Wiki](https://wiki.haskell.org/Multi-parameter_type_class)
* PolyKinds 
	* Allow kind polymorphism: a type variable doesn't have to be restricted to one kind.
* RebindableSyntax
	*   [24](https://ocharles.org.uk/blog/guest-posts/2014-12-06-rebindable-syntax.html)
	*   Overload `>>` and `return` in order to make do notation do - basically - whatever we want it to!
	*   Example: composition
	    ```haskell
		(>>)    = flip (.)
		return  = id
		```
	*   Example: Kleisli arrows: `(>>) = (<=<)`
	* It's a relatively common problem in Haskell to think you have a Monad instance for some data type, but in reality, additional constraints make this impossible.
	*   Example: 
		```
		setBind :: Ord b => Set a -> (a -> Set b) -> Set b
		```
* RecordWildCards
    *   [24](https://ocharles.org.uk/blog/posts/2014-12-04-record-wildcards.html)
	*   For `data Record = Record {a :: A, b :: b}` and a function `f r = g (a w)  (b w)` you can save writing the `w` by: `f Record{..} = g a b`.
	*   To also be able to refer to the variable, do `f r@Record{..} =`
	*   Create a Record field by field
	    ```haskell
		do
		  a <- ...
		  b <- ...
		  return Record{..}
		```
	* See also [Gabriel's blog post](http://www.haskellforall.com/2012/07/first-class-modules-without-defaults.html).
* StandaloneDeriving
	*   Allow nonempty contexts when deriving
		```haskell
		data T m = MkT (m Int)
		deriving instance Eq (m Int) => Eq (T m)
		```
	* May need FlexibleContexts and UndecideableInstances
	* [Haskell](http://downloads.haskell.org/~ghc/7.8.4/docs/html/users_guide/deriving.html)
* TypeOperators 
    * [Reference](https://ocharles.org.uk/blog/posts/2014-12-08-type-operators.html)
	* `data a + b = Plus a b`.
	* (+) can be used both as a function and as a type operator - they are in different namespaces. To export the type operator, use ExplicitNamespaces, `import M( type (+))`.
