const pdf = new jsPDF();

var x = 10;
var y = 10;

pdf.text('This is my first line in jsPDF', x, y);

pdf.save('A4.pdf');
