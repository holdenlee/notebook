---
title: Type theory
published: 2016-07-31
modified: 2016-07-31
tags: none
type: notes
showTOC: True
---

#Hindley-Milner type system

The Hindley-Milner type system is a very nice point in the space of possible type systems because there is a reasonable algorithm to deduce the most general type of a program without type annotations (it is sound and complete).

To understand it, we need to understand

* the ingredients: what are syntactically valid expressions?
* the axioms: the rules that allow you to say what types more complicated expressions are, given the types of the building blocks.
* the algorithm: an efficient way to find the most general type (ex. `Int -> a -> List a`) of an expression, given the types of the building blocks. This algorithm can be proved to capture all possible types for the expression.

What rules make sense?
$$ x:a,\quad f:a\to b\vdash f x:b$$
And we need some kind of specialization
$$ x : \forall a, F(a) \vdash x : F(a').$$
We need lambda expressions too. 

##Ingredients

```haskell
newtype Var = Var String
newtype TVar = TVar String

data Expr = ExprV Var -- x
	| App Expr Expr -- e_1 e_2
	| Lambda Var Expr -- \lambda x. e
	| Let Var Expr Expr -- let x = e_1 in e_2

data Mono = MonoV TVar -- a
	| TApp Type [Mono] -- D t_1 ..., here D is a parametric type with some number of arguments

data Poly = PolyM Mono -- t
	| Forall TypeVar Poly -- \forall a . s
```
(Note, "->" is a special case of TApp: TApp fun [a, b].)

Monotypes can only be one type (ex. `Int -> [Int]`) while polytypes can be many different types (ex. `a -> [a]`, forall is implicit here).

We need to make a distinction between monotypes and polytypes because **only monotypes can go in the forall**.

We also need the notion of **free variable**. These are variables that have not been captured by a $\forall$.
```
import Data.Set as S

freeM :: Mono -> S.Set TVar
freeM = \case
	MonoV t -> S.singleton t
	TApp _ ts -> S.unions (map freeM ts)

freeP :: Poly -> S.Set TVar
freeP = \case
	PolyM m s -> S.delete m (freeP si)
```
(Warning: in Haskell all type variables are implicitly bound, so free variables do not appear. See Ex. 1 in wikipedia.)

Next we need the notion of a context, which says what expressions are of what type. For example, it can say what types the variables are; in the inside of `let` we need to know what the context is to do typing.

```
data Bindings = Bind Var Poly -- x:s

type Context = S.Set Bindings

freeC :: Context -> S.Set Var
freeC ga = S.unions (map (\case Bind v s -> freeP s) (S.elems ga))
	
```
<!--Is set a monad?-->

The polymorphic types form a partial order $\si\sqsubseteq \si'$, $\si$ is more special. Ex. `Map Int Int`$\sqsubseteq$`Map Int v`$\sqsubseteq$`Map k v`.

<!--this requires a bit more work to code...-->
<!--note: need to add deriving...-->

#Axioms

\begin{align}
\frac{x:\si\in \Ga}{\Ga\vdash x:\si}&& \text{[Var]}\\
\frac{\Ga\vdash e_0:\tau \to \tau'\quad
\Ga\vdash e_1:\tau}{\Ga\vdash e_0 \,e_1:\tau'}&& \text{[App]}\\
\frac{\Ga\cup \{ x:\tau\} \vdash e:\tau'}{\Ga \vdash \lambda x.e:\tau \to \tau'} &&\text{[Abs]}\\
\frac{\Ga \vdash  e_0:\si\quad \Ga\cup \{x:\si\}\vdash e_1:\tau}{\Ga \vdash \text{let }x=e_0\text{ in }e_1:\tau}&& \text{[Let]}\\
\frac{\Ga \vdash e:\si'\quad \si'\sqsubseteq \si}{\Ga \vdash e:\si}&&\text{[Inst]}\\
\frac{\Ga \vdash e:\si\quad \al\nin \text{free}(\Ga)}{\Ga \vdash e:\forall \al.\si}&&\text{[Gen]}.
\end{align}
Abs is abstraction. Inst is instantiation.
Note we add to the context when we go inside a lambda or a let.
Gen then Inst together help specialize given information in context.

Subtlety: in `let`, variables enter in polymorphic form and can be specialized. Contrast
$$
\la f. (f \,\text{true}, f \,0)
$$
with
$$
\text{let } f = \la x. x\text{ in } (f\text{ true}, f \, 0).
$$
This is why `let` is NOT just syntactic sugar for $(\la x.e_2)\,e_1$; it genuinely adds expressivity.

#Algorithm W

Algorithm is simple, but there's a lot of things you have to define first (ex. substitution, instantiation).

First, define a unification algorithm. It takes expressions (AST's) $\si,\tau$ and returns a substitution (map) $U$, such that for any substitution $R$ unifying $\si$ and $\tau$, $R=SU$. I.e., it gives the most general unification. (Unify by making more specific.)

Algorithm W: Given a context/type environment $\ol p$ (map from strings to polytypes/schemes), and an expression $e$, return a substitution and a typing for $e$ and all subexpressions. (We will denote such a typing by $\ol{e}_\si$ where $\si$ is the type for $e$, and $\ol{\bullet}$ means that all subexpressions have been annotated.) If $e$ is...

* variable $x$: Lookup $x$ in the type environment. If it's not there, ERROR. Let $\tau$ be the type. Substitute generic (bound) variables in $\tau$ by new (free) variables. I.e., `({}, instantiate(tau))`.
* application $d\,e$:
	* Run $W$ on the function: $(R,\ol d_\rh) = W(\ol p, d)$.
	* Run $W$ on the argument, where we apply the substitution output by the function, $(S, \ol e_\si) = W(R\ol p, e)$.
	* We've now calculated a type $\rh$ for the function, and a type $\si$ for the argument. Now we need to unify these. (Ex. the function is $a\to a$ and the type is `Int`.) Let $\be$ be a new variable. Unify $S\rh$ and $\si\to \be$, $U=U(S\rh, \si\to \be)$.
	* Return $(USR, U(((S\ol d)\ol e)_\be))$. (Compose the substitutions in the order that we calculated them.) Explanation:
	    * We had a typing for $\ol d$. We update that by $S$.
		* The type for $d\, e$ is $\be$ (found in the previous step).
		* Apply $U$ to get the type for the whole expression.
	* Note: if $x$ came from $\la x:\be$, then $\be$ is a monotype (possibly with free variables), and no substitution is done. If $x$ came from `let` then $x$ may have bound variables, so we instantiate new variables.
* abstraction $\la x. \,d$:
    * Let $\be$ be a new type variable.
    * Add $x:\be$ to the context, $\ol p \cup \{x:\be\}$.
	* Run $W$ with this new context, $W(\ol p \cup \{x:\be\}, d)$.
	* Return $(R, (\la x_{R\be}.\ol{d}_\rh)_{R\be \to \rh})$.
* `let x=d in e`. This different similar to $\la$ with application ($(\la x . d) \, e$) because there we would apply the substitution to the function $d$ ($S\rh$) and attempt to unify, but here we keep the bound variables in $d$.
    * Run $W$ on $d$: Let $(R,\ol d_\rh)=W(\ol p, d)$.
	* Run $W$ on $e$ with $\{x:\rh\}$ added: Let $(s,\ol e_\si) = W(R\ol p\cup \{x:\rh\}, e)$.
	* Return $(SR, (\text{let }x_{S\rh} = S\ol d\text{ in }\ol e)_{\si})$.
	* !! Should generalize here: abstract ($\forall$) over all variables free in $d$ but not free in the environment. Ex. `let foo = \y -> x` in context `x:a`. `\y -> x : b -> a` is not yet generalized. Make it $\forall b: b\to a$.

Note we don't really need to keep track of the intermediate typings, just the substitutions.

Subtle point I'm still trying to get clear (ex. 1):
```
let bar [forall a. forall b. a -> (b -> a)] = \x ->
	let foo [forall b. b -> a] = \y -> x
	in foo
in bar
```
is the same as
```haskell
\x -> (\y -> x)
```
right?

#Bottom-up Algorithm W

```haskell
data Constraint = EqC Poly Poly
	| InstM Poly (S.Set Mono) Poly
	| GenericInst Poly Poly
```

Generate the constraint set as follows. For an expression $e$, if $e$ is

* variable $x$: Get fresh $\be$, note $x:\be$.
* application $e_1\,e_2$: Recurse on $e_1$ and $e_2$ (take union of constraints and typings). Let $e_1:\tau_1$, $e_2:\tau_2$. Note $e_1\, e_2:\be$, add $\tau_1\equiv \tau_2\to \be$ to the constraint set.
* abstraction $\la x. e$: Recurse on $e$, suppose $e:\tau$. Take all typings of the form $x:\tau'$ and make constraints $\tau'\equiv \be$. Generate fresh $\be$. Type $\la x.e : (\be \to \tau)$.
* `let x=e_1 in e_2`: Recurse on $e_1:\tau_1$, $e_2:\tau_2$, and type as $\tau_2$. For all typings of the form $x:\tau'$ generated by $e_2$, add $\tau'\le_M \tau_1$ to the constraint set.

Note that for the $\le_M$ constraint, we need to keep a list of monomorphic variables $M$ (corresponding to free---introduced in lambdas) as we recurse down the tree. (Things in lambdas DO NOT generalize, in $\la x. e$, $x$ can't have two different types/interpretations in $e$. Thus within the lambda expression, $x$ is in the monomorphic set---you can't do $\forall x$.)

The bottom-up inference rules are different from the usual inference rules:

* Usual rules keep the context the same; these change the context.
* They translate more directly into an algorithm.
* They involve the constraints, not the context.

See p. 10 for the algorithm.

#Lambda cube

https://en.wikipedia.org/wiki/Lambda_cube

<img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Lambda_cube.png">

3 dimensions:

* Polymorphism (bottom/top)
* Type operators/types depending on types (front/back)
* Types depending on terms, dependent types (left/right)

Front:

| * | None | Dependent types |
|---|---|---|
|Polymorphism| F, $\la2$ | $\la P2$ |
|None| $\la_{\to}$ | LF, $\la P$ |

Back: (types depending on types)

| * | None | Dependent types |
|---|---|---|
|Polymorphism| $F_\om$, $\la \om$ | CIC, $\la P\om$ |
|None| $\la_\om$, $\la\ul{\om}$ | $\la P \ul{\om}$ |

Hindley-Milner is a subset of System F (in between $\la_{\to}$ and $F=\la 2$). Haskell contains system F.

References:

* $F_{<:}$ (F with subtyping): Ch. 26, 28
* $\la_\om$ (types depending on types): Ch. 29
* $F_\om$ (F with types depending on types): Ch. 30
* $F_{<:}^\om$: CH. 31

#Scratch
