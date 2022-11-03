#region Imports

using System;
using System.Security.Cryptography;
using System.Text;
using Worqbox.UI.ExceptionTracer;

#endregion

namespace Worqbox.UI.AuthorizationHelper
{
    public static class EncryptionDecryptionHelper
    {
        public static string EncryptData(string textData, string Encryptionkey)
        {
            try
            {
                var objrij = new RijndaelManaged();
                //set the mode for operation of the algorithm   
                objrij.Mode = CipherMode.CBC;
                //set the padding mode used in the algorithm.   
                objrij.Padding = PaddingMode.PKCS7;
                //set the size, in bits, for the secret key.   
                objrij.KeySize = 0x80;
                //set the block size in bits for the cryptographic operation.    
                objrij.BlockSize = 0x80;
                //set the symmetric key that is used for encryption & decryption.    
                var passBytes = Encoding.UTF8.GetBytes(Encryptionkey);
                //set the initialization vector (IV) for the symmetric algorithm    
                byte[] EncryptionkeyBytes =
                    {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00};

                var len = passBytes.Length;
                if (len > EncryptionkeyBytes.Length) len = EncryptionkeyBytes.Length;

                Array.Copy(passBytes, EncryptionkeyBytes, len);

                objrij.Key = EncryptionkeyBytes;
                objrij.IV = EncryptionkeyBytes;

                //Creates a symmetric AES object with the current key and initialization vector IV.    
                var objtransform = objrij.CreateEncryptor();
                var textDataByte = Encoding.UTF8.GetBytes(textData);
                //Final transform the test string.  
                return Convert.ToBase64String(objtransform.TransformFinalBlock(textDataByte, 0, textDataByte.Length));
            }
            catch (Exception ex)
            {
                ExceptionLogging.SendErrorToText(ex);
                return null;
            }
        }

        public static string DecryptData(string EncryptedText, string Encryptionkey)
        {
            try
            {
                var objrij = new RijndaelManaged();
                objrij.Mode = CipherMode.CBC;
                objrij.Padding = PaddingMode.PKCS7;

                objrij.KeySize = 0x80;
                objrij.BlockSize = 0x80;
                var encryptedTextByte = Convert.FromBase64String(EncryptedText);
                var passBytes = Encoding.UTF8.GetBytes(Encryptionkey);
                var EncryptionkeyBytes = new byte[0x10];
                var len = passBytes.Length;
                if (len > EncryptionkeyBytes.Length) len = EncryptionkeyBytes.Length;

                Array.Copy(passBytes, EncryptionkeyBytes, len);
                objrij.Key = EncryptionkeyBytes;
                objrij.IV = EncryptionkeyBytes;
                var TextByte = objrij.CreateDecryptor()
                    .TransformFinalBlock(encryptedTextByte, 0, encryptedTextByte.Length);
                return Encoding.UTF8.GetString(TextByte); //it will return readable string  
            }
            catch (Exception ex)
            {
                ExceptionLogging.SendErrorToText(ex);
                return null;
            }
        }

        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
            return Convert.ToBase64String(plainTextBytes);
        }

        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
            return Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}