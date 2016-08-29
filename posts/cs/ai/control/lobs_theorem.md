---
title: Lob's Theorem
published: 2016-08-19
modified: 2016-08-19
tags: ai safety, logic
type: notes
showTOC: True
---

Does PA claim to be sound? (More standard notation: $\square X$ for $PA[X]$.)
$$PA[PA[X]\implies X]$$
No. Then PA would be inconsistent. (Why?)
$$PA[PA[X]\implies X]\implies PA[X].$$
(Converse is obviously true.)

Alas, this means we can't prove PA sound with respect to any important
class of statements. (?)

Lob's sentence: L says "If a proof of L exists, then C."
$$L = \square L \implies C$$
(?If we assume $\square L \implies L$, then $\square L \implies C$. Assuming $\neg \square L$ doesn't give anything.)

cf. "If this sentence is true, then Santa Claus exists."[^f1]

[^f1]: Confused ramblings (wrong?) This sentence is true---even if Santa Claus doesn't exist! The problem with provability logic - why you can't just add in $\square X \implies X$ as an axiom---is that you can now prove both $X, \neg X$ by constructing Lob's sentence! Reflection doesn't work---it's not that simple! You have to design a logic to make reflection not inconsistent!

For a sentence to refer to itself, it must
contain a self-replicating recipe - when the
recipe is executed, it produces a copy of the
complete sentence, including the recipe itself

Generalities about Lob.

1. The difference between truth and provability. If we defined $\square$ correctly, $\square S \to S$ looks to always be true. However, it's not provable, unless $S$ is provable!
2. $\square$ seems like negation in some way. (Cf. proof by contradiction)
3. We would want PA on occassion to assert its own soundness. But no, it only asserts its soundness on statements that are actually provable.
4. $\square (\square S \to S)$ only when $S$ is provable.
5. It seems bizarre!

# Proof

Note:

* $\implies$ means a deduction rule. From $A$ you can deduce $B$. $A\implies B$ is not a statement within PA, it is within the meta-logic you're defining everything in (which can be PA if you want!). (But you can consider $A\to B$, which is a statement in PA.)
* $\to$ is a statement in PA. $\to$ is turned into $\implies$ by MP.

I'm not distinguishing between $PA \vdash X$ and $\square X$. They are equivalent (in the meta-logic). 

Use

1. (A1) $\square X \implies \square \square X$. This takes work to prove. Show that given a proof of $X$, you can turn it into a proof that a proof of $X$ exist! Mind-bending.
2. (A2) $\square (\square X \to \square \square X)$. (A1) is provable.
3. (A3) $\square (\square (A \to B) \to (\square A \to \square B))$. This is straightforward: if you have a proof of $A$, and a proof of $A\to B$, you can make a proof of $B$ by joining the proofs together and adding a modus ponens at the end. You can furthermore prove this within PA.
4. (MP) $\square A, \square (A\to B)\implies \square B$. The non-meta version of the above.
5. (B1) $\square (A\to B), \square (B\to C), \implies \square (A\to C)$. 
6. (B2) $\square (A\to B), \square (A\to (B\to C)), \implies \square (A\to C)$.

Let $L=\square L \to C$. If $L$ is provable, then $C$.

1. $\square (\square L \lra \square (\square L \to C))$. Unpack the box.
2. $\square (\square C\to C)$. Lob's hypothesis. <!--We aim to show that if $L$ is provable, then we can prove $C$ is provable, and hence $C$ is provable.-->
3. $\square (\square (\square L \to C) \to (\square(\square L)\to \square C))$ by A3.
4. $\square( \square L \to (\square (\square L)\to \square C))$. I.e., we distributed the $\square$ in (1). If $\square L$ and $\square \square L$, then $C$. But this means we can get $C$ from just $\square L$, because of A2!
5. Use A2.
6. $\square (\square L \to \square C)$.
7. $\square (\square L \to C)$.
8. $\square\square (\square L \to C)$.
9. $\square\square L$. KEY! To prove $L$, you just have to prove $\square L \to C$, by definition of $L$! So you get $\square\square L$ for free! (Not $\square L$.) How did we get $\square\square L$? We used Lob's hypothesis and A2.
10. $\square C$.

# Questions: 

* What happens if we add the axiom $\square X \implies X$? What might break? Is  Proofs can now include the statement "$\square X \implies X$"?
* "if PA asserted its own soundness (in general), PA would become inconsistent." Does this just mean we can't add this axiom, or that it being provable leads to a contradiction? (Can you get this from "This theorem is unprovable" type things?)
* Undefinability of truth: no predicate True such that $True(X)\text{ xor }  True(\neg X)$ and $True(X)\implies X$. Or: if you extend with primitive "True" you get a contradiction.

Intuition: If a program doesn't have native support for meta-programming, then you can't program in meta-programming. Here, I mean: take a data structure and splice it into the program itself. (But you could always write a compiler in the language, and apply the compiler to the string...)

This setting is different. To prove something, you have to write down the entire proof. You aren't allowed to make a program that writes down the proof. Ex. you want to show $\forall x, P(x)$. You are not allowed to write down a program that given $x$, spits out a proof of $x$. 

If you try the recursive fix, it's not clear that the language is still consistent. Perhaps now $\square \perp$, and hence $\perp$!

