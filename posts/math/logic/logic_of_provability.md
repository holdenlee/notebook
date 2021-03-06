---
title: Logic of provability
published: 2016-08-25
modified: 2016-08-25
tags: logic, self-reference, provability
type: notes
showTOC: True
---

George Boolos

# Systems

Normal: all tautologies, distribution axioms, closed under MP, necessitation (???), substitution. 

(I'm confused about necessitation. Aren't there true things without proof? Yes, but you couldn't have written them down in the first place! The fact that you can write down $A$ as a result of some deductions means you proved $A$, so you might as well say you proved $\square A$ too! Note $A\implies \square A$ is a deduction rule, but $A\to \square A$ is NOT TRUE! The difference is that in the deduction rule, $A$ must have been deduced as well. I hesitate to call this a deduction rule, actually... This can only be done top-level, you can't do it on $A\wedge \neg A$... A rule of inference cannot always be interpreted as an axiom! This inference rule is sort-of like Kripke... I think you have to be very careful here to avoid $A\to \square A, \neg A \to \square \neg A, \square A \wedge \square \neg A$.)

Additional axioms.

* K (Kripke): no more.
* K4: $\square A \to \square\square A$. This is true and provable in PA.
* T: $\square A \to A$. This is NOT provable in PA. What happens if we add it?
* S4: K4+T.
* B: T+$\square \diamond A$.
* S5: T+$\diamond A \to \square \diamond A$.
* GL: Lob's Theorem $\square (\square A \to A) \to \square A$. 

Inclusions: Note K4$\subeq$GL, B$\subeq$S5.

Question: Why doesn't K4 imply GL?

# Questions

https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems

What is true arithmetic?

Undecidable: $\neg \square X \wedge \neg  \square \neg X$. 

* Let $S$ be the sentence such that $S=\neg  \square S$. 
    * Is it true that $\neg \square S \wedge \neg \square \neg S$?
	* Is $ \square(\neg \square S \wedge \neg \square \neg S)$?
	* Is $ \square(\neg \square \perp \to (\neg \square S \wedge \neg \square \neg S))$?
* What happens if we add $\neg \square \perp$ as an axiom?
* I don't understand $\om$-consistency. First incompleteness: if arithmetic is $\om$-consistent, then arithmetic is incomplete. Is this weaker or stronger than consistency? 1-consistency is stronger, because $\square \cdots \square \perp$ are not theorems. (?) $\om$-consistency implies 1-consistency, so $\om$-consistency is strongest.

GLS: GL+$\square A\to A$, only MP.

GL, GLS have decision procedures. (They only capture part of PA.)

Formalizing existence?

If $X$ is true (in all consistent extensions) but not provable, then is $\square X$ decidable? What about $\square \square X$? Etc.

Suppose $X=\neg \square X$. Why doesn't $\neg X \to \square X \to X$ so $\neg X\to \perp$ constitute a proof of $X$?

* Because you can't use the law of the excluded middle. (Is it true that $\square (X\to Y), \square (\neg X\to Y)$ imply $\square Y$? I think there shouldn't be any problem.)
* Because you can't use $\square X \to X$. You don't have the axiom $\square X\to X$, and by Lob, $\square (\square X\to X)$ only when $\square X$.
