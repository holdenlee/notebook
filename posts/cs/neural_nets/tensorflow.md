---
title: Tensorflow setup
published: 2016-07-22
modified: 2016-07-22
tags: programming
type: programming
---

#Setup on Tiger

Load tensorflow on startup, e.g. put in `.bashrc`.

```
module load python cudatoolkit/7.5 cudann
pip install --user /tigress/plazonic/public_html/tensorflow/rhel6/tensorflow_pkg_gpu/tensorflow-0.8.0-py2-none-any.whl
```

Sample script

```
#!/bin/bash

#SBATCH -t 10:00:00
#SBATCH -N 1
#SBATCH --ntasks-per-node=4
#SBATCH --ntasks-per-socket=2
#SBATCH --gres=gpu:2
#SBATCH --mail-type=begin  
#SBATCH --mail-type=end  
#SBATCH --mail-user=holdenl@princeton.edu  

module load python
module load cudatoolkit/7.5
module load cudann
THEANO_FLAGS=mode=FAST_RUN,device=gpu,floatX=float32 python cifar10_multi_gpu_train.py --num_gpus=2 --train_dir='/tigress/holdenl/tmp/cifar10_train1'
```

Run by `sbatch script.cmd`.

#CIFAR setup

* Train by calling `cifar10_multi_gpu_train.py` or `cifar10_train.py`.
    * This calls `cifar10.py` to build the graph.
	* It calls `cifar10_input.py` to download or load the data.
		* `data_dir` defined in `cifar10.py`. (Changed to `/tigress/knv/cifar10_data`.)

Settings: Override flags as above.

* `num_gpus=2` seems to work best.
* Specify training directory, ex. `train_dir='/tigress/holdenl/tmp/cifar10_train1'`.

#Train

```python
train(fs, step_f, output_steps=10, summary_steps=100, save_steps=1000, eval_steps = 1000, max_steps=1000000, train_dir="/", log_device_placement=False, batch_size=128,train_data=None,validation_data=None, test_data=None, train_feed={}, eval_feed={}, x_pl="x", y_pl="y_", batch_feeder_args=[])
```

*   `fs` is a dictionary containing: inference, loss functions
*   `step_f` is function to execute at each training step, taking arguments `fs` and `global_step`. Example
    ```python
	lambda fs, global_step: (
      train_step(fs["loss"], fs["losses"], global_step, 
                 lambda gs: tf.train.AdamOptimizer(1e-4)))
    ```
* 

#Misc notes

Constants

* `NUM_EXAMPLES_PER_EPOCH_FOR_TRAIN=50000`
* `NUM_EXAMPLES_PER_EPOCH_FOR_EVAL=10000`
* `NUM_EPOCHS_PER_DECAY`
* `INITIAL_LEARNING_RATE`
* `LEARNING_RATE_DECAY_FACTOR`
* `NUM_CLASSES=10`
* `MOVING_AVERAGE_DECAY = 0.9999`
* `NUM_EPOCHS_PER_DECAY = 350.0`
* `LEARNING_RATE_DECAY_FACTOR = 0.1`
* `INITIAL_LEARNING_RATE = 0.1`

#Todo

* Find tiger's policies on storing files.
