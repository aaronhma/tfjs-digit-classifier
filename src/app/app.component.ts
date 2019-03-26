import { Component, OnInit, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

import { DrawableDirective } from './draw/drawable.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public linearModel: tf.Sequential;
  public model: tf.LayersModel;
  public predictions: Array<number> | undefined;

  @ViewChild(DrawableDirective) canvas;

  ngOnInit() {
    this.loadModel();
  }

  // Model stored at: https://github.com/aaronhma/tfjs-digit-classifier/tree/master/src/assets/cnn
  // tf.js layers format is a directory containing a model.json file and a set of sharded weight files in binary format.
  // model.json contains both the model topology (aka "architecture" or "graph": a description of the layers and how they are
  // connected) and a manifest of the weight files.
  async loadModel() {
    // Load a model that composed of layer objects
    // Use TF.js converter to convert digit recognizer model to TF.js Layers format
    this.model = await tf.loadLayersModel('assets/cnn/model.json');
  }

  async predict(imageData: ImageData | null) {
    // condition below is used when clear button is clicked
    if (imageData === null) {
      this.predictions = undefined;
      return;
    }

    // use tidy function to help avoid memory leaks with automatic memory cleanup
    await tf.tidy(() => {
      // Convert the canvas pixels to TensorFlow Tensor
      let img = tf.browser.fromPixels(imageData, 1);
      // Data preparation: remove the color dimension and normalizing pixel values
      img = img.reshape([1, 28, 28, 1] as any);
      // Convert the tensor to a new type: float32
      img = tf.cast(img, 'float32');

      // Use pretrained model execute the inference for the input tensor (canvas pixel)
      const output = this.model.predict(img) as any;

      // Save predictions to an output arary and accessed on the component
      this.predictions = Array.from(output.dataSync());
    });
  }
}
