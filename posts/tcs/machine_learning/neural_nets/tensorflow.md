---
title: Tensorflow setup
published: 2017-03-03
modified: 2017-03-03
tags: neural nets, programming, tensorflow
type: programming
showTOC: True
---

# Setting up tensorflow project

```
sudo apt-get install python-pip python-dev python-virtualenv 
virtualenv --system-site-packages ~/tensorflow
source ~/tensorflow/bin/activate # do every time
pip3 install --upgrade tensorflow-gpu
```

With keras ([tutorial](http://www.pyimagesearch.com/2016/11/14/installing-keras-with-tensorflow-backend/))
```
virtualenv --system-site-packages ~/keras_tf
source ~/keras_tf/bin/activate # do every time
#mkvirtualenv keras_tf
#workon keras_tf
pip install --upgrade tensorflow-gpu
pip install numpy scipy
pip install scikit-learn
pip install pillow
pip install h5py
pip install keras
```
To exit, `deactivate`.

Cleverhans: at `holdenl`
```
git clone https://github.com/openai/cleverhans
export PYTHONPATH="/home/optml/holdenl/cleverhans":$PYTHONPATH # do every time
pip install matplotlib
```
For cycles, `export PYTHONPATH="/u/holdenl/code/cleverhans":$PYTHONPATH # do every time`

Cycles: do every time
```
export PYTHONPATH="/u/holdenl/code/cleverhans":$PYTHONPATH # do every time
source ~/keras_tf/bin/activate # do every time
```

# Tensorboard

Do `ssh` linking port 6006:
```
ssh -t -t -L 6006:localhost:6006 holdenl@portal.cs.princeton.edu "ssh -L 6006:localhost:6006 optml@optml.cs.princeton.edu"
```
Run tensorboard.
```
tensorboard --logdir=tf-slim/train/
```

# Restoring

```py
restorer = tf.train.Saver()
with tf.Session() as sess:
	# Restore variables from disk. #tf-slim/
	restorer.restore(sess, "./tf-slim/train/model.ckpt-20000")
	print("Model restored.")
	print("test accuracy %g"%accuracy.eval(feed_dict={
            x: mnist.test.images, y_: mnist.test.labels, keep_prob: 1.0}, session=sess))
```

# Sessions and graphs

A graph is just the skeleton. A session is when the graph is actually run. 

Two ways to run a session:
```py
sess = tf.Session()
sess.run(tf.global_variables_initializer())
accuracy.eval(feed_dict={
	x:batch[0], y_: batch[1], keep_prob: 1.0}, session=sess)
```
Second way: (Probably this is preferred because "with" invokes some magic.)
```py
sess = tf.Session()
with tf.Session() as sess:
	...
```

# Scopes
		
```
with tf.variable_scope("conv1"):
```

# Questions to figure out

* What CPU/GPU is actually used?
* How do virtual environments work?
