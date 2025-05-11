document.addEventListener('DOMContentLoaded', function() {
    const cardForm = document.getElementById('cardForm');
    const cardNumberInput = document.getElementById('cardNumber');
    const resultContainer = document.getElementById('resultContainer');
    const cardType = document.getElementById('cardType');
    const cardMessage = document.getElementById('cardMessage');
    const cardLength = document.getElementById('cardLength');
    const cardPrefix = document.getElementById('cardPrefix');
    const isValid = document.getElementById('isValid');
    const cardNumberDisplay = document.querySelector('.card-number');
    const cardBrand = document.querySelector('.card-brand');
    const cardError = document.getElementById('cardError');
    

    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
        
        updateCardDisplay(value);
        
        identifyCard(value);
    });
    
    cardForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cardNumber = cardNumberInput.value.replace(/\D/g, '');
        
        if (cardNumber.length < 13) {
            cardError.style.display = 'block';
            return;
        }
        
        cardError.style.display = 'none';
        const result = identifyCard(cardNumber);
        
        if (result) {
            resultContainer.style.display = 'block';
            resultContainer.classList.add('pulse');
            
            setTimeout(() => {
                resultContainer.classList.remove('pulse');
            }, 500);
            
            if (isLuhnValid(cardNumber)) {
                resultContainer.classList.add('valid');
                resultContainer.classList.remove('invalid');
            } else {
                resultContainer.classList.add('invalid');
                resultContainer.classList.remove('valid');
            }
        }
    });
    
    function updateCardDisplay(cardNumber) {
        if (!cardNumber) {
            cardNumberDisplay.textContent = '•••• •••• •••• ••••';
            return;
        }
        
        let display = '';
        for (let i = 0; i < 16; i++) {
            if (i > 0 && i % 4 === 0) {
                display += ' ';
            }
            display += (i < cardNumber.length) ? cardNumber[i] : '•';
        }
        
        cardNumberDisplay.textContent = display;
    }
    
    function identifyCard(cardNumber) {
        if (!cardNumber || cardNumber.length < 13) {
            return null;
        }
        
        // Regras para identificar bandeiras de cartões
        let brand = 'Desconhecido';
        let prefix = '';
        let isLuhnCheckValid = isLuhnValid(cardNumber);
        
        // Visa
        if (/^4/.test(cardNumber) && [13, 16, 19].includes(cardNumber.length)) {
            brand = 'Visa';
            prefix = '4';
        }
        // Mastercard
        else if (((/^5[1-5]/.test(cardNumber)) || 
                (/^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/.test(cardNumber))) && 
                cardNumber.length === 16) {
            brand = 'Mastercard';
            prefix = cardNumber.substring(0, 2);
            if (prefix.startsWith('2')) {
                prefix = cardNumber.substring(0, 4);
            }
        }
        // American Express
        else if (/^3[47]/.test(cardNumber) && cardNumber.length === 15) {
            brand = 'American Express';
            prefix = cardNumber.substring(0, 2);
        }
        // Discover
        else if ((/^6011/.test(cardNumber) || 
                /^65/.test(cardNumber) || 
                /^64[4-9]/.test(cardNumber) ||
                /^622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[0-1]\d|92[0-5])/.test(cardNumber)) && 
                (cardNumber.length >= 16 && cardNumber.length <= 19)) {
            brand = 'Discover';
            if (cardNumber.startsWith('6011')) {
                prefix = '6011';
            } else if (cardNumber.startsWith('65')) {
                prefix = '65';
            } else if (/^64[4-9]/.test(cardNumber)) {
                prefix = cardNumber.substring(0, 3);
            } else {
                prefix = cardNumber.substring(0, 6);
            }
        }
        // Diners Club
        else if ((/^3(0[0-5]|[68-9])/.test(cardNumber)) && 
                (cardNumber.length >= 14 && cardNumber.length <= 19)) {
            brand = 'Diners Club';
            if (cardNumber.startsWith('3')) {
                if (cardNumber[1] === '6' || cardNumber[1] === '8' || cardNumber[1] === '9') {
                    prefix = cardNumber.substring(0, 2);
                } else {
                    prefix = cardNumber.substring(0, 3);
                }
            }
        }
        // JCB
        else if (/^35(2[8-9]|[3-8]\d)/.test(cardNumber) && 
                (cardNumber.length >= 16 && cardNumber.length <= 19)) {
            brand = 'JCB';
            prefix = cardNumber.substring(0, 4);
        }
        // Elo (Brasil)
        else if ((/^(401178|401179|438935|457631|457632|431274|451416|457393|504175)/.test(cardNumber) ||
                /^(506699|5067[0-7]\d|506798)/.test(cardNumber) ||
                /^(509\d{3})/.test(cardNumber) ||
                /^(627780|636297|636368)/.test(cardNumber) ||
                /^(650031|650032|650033|650035|650036|650037|650038|650039|650050|650051)/.test(cardNumber) ||
                /^(65040[5-9]|6504[1-3]\d)/.test(cardNumber) ||
                /^(6504[8-9]\d|650[5-8]\d{2})/.test(cardNumber) ||
                /^(6509[0-7]\d|650980|650981|650982|650983|650984|650985|650986|650987|650988|650989|650990|650991|650992|650993|650994|650995|650996|650997|650998|650999|6510\d{2}|651[1-4]\d{2}|6515[0-1]\d)/.test(cardNumber) ||
                /^(65152[0-1]|651522|651523|651524|651525|651526|651527|651528|651529|65153\d|6516[0-7]\d|651680|651681|651682|651683|651684|651685|651686|651687)/.test(cardNumber) ||
                /^(6516[8-9]\d|651[7-9]\d{2}|65[2-9]\d{3})/.test(cardNumber)) &&
                cardNumber.length === 16) {
            brand = 'Elo';

            if (cardNumber.startsWith('65')) {
                prefix = cardNumber.substring(0, 6);
            } else if (cardNumber.startsWith('5')) {
                prefix = cardNumber.substring(0, 6);
            } else if (cardNumber.startsWith('4')) {
                prefix = cardNumber.substring(0, 6);
            } else if (cardNumber.startsWith('6')) {
                prefix = cardNumber.substring(0, 6);
            }
        }
        // Hipercard (Brasil)
        else if (/^(606282)/.test(cardNumber) && cardNumber.length === 16) {
            brand = 'Hipercard';
            prefix = '606282';
        }
        
        cardType.textContent = brand;
        cardBrand.textContent = brand;
        cardLength.textContent = `Comprimento: ${cardNumber.length} dígitos`;
        cardPrefix.textContent = `Prefixo: ${prefix}`;
        
        if (isLuhnCheckValid) {
            isValid.textContent = 'Validação Luhn: Aprovado';
            cardMessage.textContent = 'Número de cartão potencialmente válido.';
        } else {
            isValid.textContent = 'Validação Luhn: Reprovado';
            cardMessage.textContent = 'Número de cartão inválido.';
        }
        
        return {
            brand,
            isValid: isLuhnCheckValid,
            length: cardNumber.length,
            prefix
        };
    }
    
    function isLuhnValid(cardNumber) {
        if (!cardNumber || !/^\d+$/.test(cardNumber)) {
            return false;
        }
        
        let sum = 0;
        let alternate = false;
        
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i), 10);
            
            if (alternate) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            
            sum += digit;
            alternate = !alternate;
        }
        
        return sum % 10 === 0;
    }
});