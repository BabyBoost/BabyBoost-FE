import {
  rowContent1, rowContent2, rowContent3, rowContent4,
} from '../view/templates/templateCreator';

const changeDynamicContent = (dynamicContent, templateIndex) => {
  dynamicContent.classList.add('fade-out');
  setTimeout(() => {
    dynamicContent.classList.remove('row-content1', 'row-content2', 'row-content3', 'row-content4');
    switch (templateIndex) {
      case 1:
        dynamicContent.innerHTML = rowContent1();
        dynamicContent.classList.add('row-content1');
        break;
      case 2:
        dynamicContent.innerHTML = rowContent2();
        dynamicContent.classList.add('row-content2');
        break;
      case 3:
        dynamicContent.innerHTML = rowContent3();
        dynamicContent.classList.add('row-content3');
        break;
      case 4:
        dynamicContent.innerHTML = rowContent4();
        dynamicContent.classList.add('row-content4');
        break;
      default:
        break;
    }

    dynamicContent.classList.remove('fade-out');
  }, 500); // Sesuaikan durasi timeout dengan durasi transisi Anda
};

export default changeDynamicContent;
