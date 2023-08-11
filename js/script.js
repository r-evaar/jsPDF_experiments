const pdf = new jsPDF('portrait', 'px', 'a4');  // ppi

const block = document.querySelector('#target');
const title = block.querySelector('h3');
const paragraphs = block.querySelectorAll('p');

const margin = 20;
const docHeight = pdf.internal.pageSize.getHeight();
const docWidth = pdf.internal.pageSize.getWidth();

function getNumberFromAttr(style, attribute) {
    return parseFloat(
        style[attribute].match(/\d+(\.\d+)?/)[0]
    );
};

var splitOpts = {
    lineBreak: '\n',
    direction: 'ltr'
};
function printLine(lineElement) {
    var style = getComputedStyle(lineElement);
    var marginTop = getNumberFromAttr(style, 'margin-top');
    var padTop = getNumberFromAttr(style, 'padding-top');
    var marginBot = getNumberFromAttr(style, 'margin-bottom');
    var padBot = getNumberFromAttr(style, 'padding-bottom');

    var fontSize = getNumberFromAttr(style, 'font-size');
    var lineHeight = getNumberFromAttr(style, 'line-height');
    var fontFamily = style['font-family'];

    var textAlign = style['text-align'];

    pdf.setFont(fontFamily, 'normal');
    pdf.setFontSize(fontSize);

    var parsedText = pdf
        .splitTextToSize(lineElement.textContent, docWidth-margin*2, splitOpts);
    
    y += marginTop+padTop;
    parsedText.forEach(line => {
        line = line.trim();
        if (line == ''){return;}

        var tempX = x;
        if (textAlign != 'start'){
            textWidth = pdf.getStringUnitWidth(line) * fontSize / pdf.internal.scaleFactor;
            if (textAlign == 'center'){
                x = (docWidth-textWidth) / 2;
            } else if (textAlign == 'end') {
                x = docWidth-textWidth-margin;
            }
            
        }

        pdf.text(line, x, y);
        x = tempX;

        y += fontSize;
    });
    y += marginBot+padBot;
};

var x = margin;
var y = margin+pdf.getTextDimensions('A')['h'];

printLine(title);
paragraphs.forEach(function(e){
    printLine(e);
});

const pdfBtn = document.querySelector('#pdf-btn');
pdfBtn.addEventListener('click', function(e){
    pdf.save('A4.pdf');
}); 
