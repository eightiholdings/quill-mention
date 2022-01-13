import Quill from "quill";

const Embed = Quill.import("blots/embed");

class MentionBlot extends Embed {
  static create(data) {
    const node = super.create();
    const denotationChar = document.createElement("span");
    denotationChar.className = "ql-mention-denotation-char";
    denotationChar.innerHTML = data.denotationChar;
    node.appendChild(denotationChar);
    node.innerHTML += data.value;
    return MentionBlot.setDataValues(node, data);
  }

  static setDataValues(element, data) {
    const domNode = element;
    Object.keys(data).forEach(key => {
      domNode.dataset[key] = data[key];
    });
    return domNode;
  }

  static value(domNode) {
    return domNode.dataset;
  }
  
  update(mutations, context) {
		mutations.forEach((mutation) => {
			if (
				mutation.type === 'childList' &&
				(Array.from(mutation.removedNodes).includes(this.leftGuard)
					|| Array.from(mutation.removedNodes).includes(this.rightGuard))
			) {
				let tag;
				if (mutation.previousSibling) {
					tag = mutation.previousSibling.innerText;
				}
				else if (mutation.nextSibling) {
					tag = mutation.nextSibling.innerText;
				}
				if (tag) {
					super.replaceWith('text', tag);
				}
			}
		});

		super.update(mutations, context);
	}
}

MentionBlot.blotName = "mention";
MentionBlot.tagName = "span";
MentionBlot.className = "mention";

Quill.register(MentionBlot);
