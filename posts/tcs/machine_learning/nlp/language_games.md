---
title: Language games
published: 2016-10-13
modified: 2016-10-13
tags: nlp, language, evolution
type: topic
showTOC: True
---

How does language develop?

How to learn a language from scratch?

Wittgenstein's "language games".

# [WLM16] Learning Language Games through Interaction

See ML seminar notes.

# [FAFW16] Learning to Communicate with Deep Multi-Agent Reinforcement Learning

Cooperative learning of communication protocols.

see also Kasai [8].

## Task

Multiple agents in fully cooperative, partially observable, sequential multi-agent decisiom-making problems. Each gets a private observation of the Markov state.

* Centralized learning (unrestricted communication)
* Decentralized execution (communicate only by discrete limited-bandwidth channel)

Actual tasks

* Switch riddle
    * DIAL > RIAL > Baseline
* MNIST games: see 2 MNIST digits of some color. Reward depends on action, color, and parity. Send 1 bit of info. Agree to send either color or parity (parity better). (DIAL seems to get optimal here. RIAL fails.)

## Model

* Reinforced inter-agent learning (RIAL)
	* Deep Q-learning
	* Independent Q-learning: learn own network parameters, treat other agents as part of environment.
	* Deep recurrent Q-network. [17]
		* + independent Q-learning = RIAL.
		* Disable experience replay (experience obsolete and misleading)
* Differentiable inter-agent learning (DIAL)
	* Takes advantage of centralized learning.
	* RIAL is only end-to-end within agent. 
	* Allows real-value messages to pass. 
	* (This is not realistic between agents in terms of evolution. But it can make sense within agents - ex. different brain parts)
	* During centralized learning, communication replaced with direct connections between output of one agent's network and input of another's.
	
Difficulty: positive rewards are sparse, arising only when sending and interpreting are properly coordinated.
	
## Conclusions

Why is language discrete? Noise forces messages into 2 different modes.
