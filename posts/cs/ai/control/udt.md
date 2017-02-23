---
title: UDT
published: 2017-02-19
modified: 2017-02-19
tags: ai safety, game theory, decision theory
type: paper
showTOC: True
---

Main notes [here](game_theory.html).

* It seems we don't need to quine - we can just view A, U as functions of each other's source codes. Just impose some halting criterion. Then just evaluate $U(\ce{A})$... Oh, but how does U give A its own code? 
	* External program runs them? I don't like this.
	* I don't like co-quining them because then I feel I lose the algorithmic interpretability - now I don't feel like they're programs anymore. For some reason I'm having trouble thinking about quines in terms of programs, I can think about them in terms of logic statements. 
	* I think the programs should handle the quining themselves. Ah. If U doesn't quine itself, it has no way of running A with its own source code. So U is a quine in the sense that it can give A its own source code. This solves things. Otherwise, U would not be able to run A. A also has incentive to quine itself, otherwise it cannot simulate U on A, or prove statements about itself. 
	* Can a non-quined program be taken advantage of?
	* Wait, but writing the code I didn't do any quining!
	* Oh, you can just assume U, A can run themselves. You assume they're quined for convenience in reasoning about them, but you don't actually need them to be quined themselves.
	* Quining is just the way in logic to get access to own source code - in programming you don't need to do it explicitly because the source code is in the file.
	* Do you need to quine for corecursion?
	* I don't think any of this is important--they're all basically taken care of by the programming language.
	* ! You can't separate what the agent does from who it is: ex. why you can't just feed all possible functions into something else, then let yourself be the best function. The other agent would act differently against that function vs. against you. Ex. playing against PrudentBot, PrudentBot defects against both `const c` and `const d`, if these are the only things you're trying, you'll just defect!
	* For U/A say the agent has fixed runtime, the universe has finite runtime (alternatively it can rely on the truth of logical statements).  For A/A say both have fixed (large) runtime.
* What if we want U to have access to some oracle? How can we ensure that we can actually prove the output of U? Can this be made equivalent to the condition that U halts?
* Is there a way to implement these agents without having them search for proofs? Ex. do "lazy evaluation?" I don't see a way to do this. 
* If `fairBot x = (if x coopBot == c then c else d)` then 
* I want to say something like, there's a sequence Bot1, Bot2,... with longer lookbacks, and Bot-k outperforms Bot-(k-1) by "pretending" to be something that Bot-(k-1) will cooperate with and then stabbing it in the back... this seems to be going the other way. 
* Why do we keep talking about "embedded" agents?
