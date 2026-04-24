<?php
/**
 * Smart School AI - Configuration File
 * 
 * This file contains sensitive configuration data for the application.
 * Access to this file should be restricted at the server level.
 * 
 * @package    SmartSchoolAI
 * @version    1.0.0
 * @author     Development Team
 */

// Prevent direct access to this file
if (defined('PHP_SAPI') && PHP_SAPI !== 'cli') {
    if (strpos($_SERVER['REQUEST_URI'], basename(__FILE__)) !== false) {
        header('HTTP/1.0 403 Forbidden');
        exit('Direct access not allowed.');
    }
}

/**
 * GEMINI AI CONFIGURATION
 * 
 * Secure API key for Google Gemini Pro service.
 * Do not share this key or commit it to public version control.
 */
$MY_API_KEY = "AIzaSyC7zycNdjt1lCO_F76g23TP_MsjGUy0ug8";

/**
 * ENVIRONMENT SETTINGS
 */
define('APP_ENV', 'production');
define('ALLOW_DEBUG', false);

/**
 * Note: The Node.js server parses this file using regex to extract the $MY_API_KEY value.
 * Ensure the variable assignment remains clean: $MY_API_KEY = "YOUR_KEY";
 */

