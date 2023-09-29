import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { TextAttribute } from './attributes/TextAttribute';

export class TextComponent extends Component {
  constructor() {
    super(
      ComponentType.Text,
      [],
      [new TextAttribute({ name: 'text', required: true, canBeEmpty: false })],
    );
  }

  protected validateAttributes(attributes) {}
}
