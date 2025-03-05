---
title: "KunServe: Elastic and Efficient Large Language Model Serving with Parameter-centric Memory Management"
collection: publications
category: preprints
permalink: /publication/KunServe
excerpt: 'Elastic and Efficient Large Language Model Serving with Parameter-centric Memory Management'
date: 2024-12-24
venue: 'Arxiv'
paperurl: 'http://kkkstra.github.io/files/KunServe.pdf'
citation: 'CHENG R, PENG Y, LAI Y, 等. KunServe: Elastic and Efficient Large Language Model Serving with Parameter-centric Memory Management[EB/OL]. (2024). https://arxiv.org/abs/2412.18169.'
---

The stateful nature of large language model (LLM) servingcan easily throttle precious GPU memory under load burstor long-generation requests like chain-of-thought reasoning,causing latency spikes due to queuing incoming requests. However, state-of-the-art KVCache centric approaches handleload spikes by dropping, migrating, or swapping KVCache,which faces an essential tradeoff between the performance ofongoing vs. incoming requests and thus still severely. This paper makes a key observation such that model param-eters are independent of the requests and are replicated across GPUs, and thus proposes a parameter-centric approach byselectively dropping replicated parameters to leave preciousmemory for requests. However, LLM requires KVCache tobe saved in bound with model parameters and thus droppingparameters can cause either huge computation waste or longnetwork delay, affecting all ongoing requests. Based on the ob-servation that attention operators can be decoupled from otheroperators, this paper further proposes a novel remote attention mechanism through pipeline parallelism so as to serve up-coming requests with the additional memory borrowed fromparameters on remote GPUs. This paper further addresses sev-eral other challenges including lively exchanging KVCachewith incomplete parameters, generating an appropriate planthat balances memory requirements with cooperative exe-cution overhead, and seamlessly restoring parameters whenthe throttling has gone. Evaluations show that KUNSERVE reduces the tail TTFT of requests under throttling by up to 27.3x compared to the state-of-the-art.