-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 05, 2026 at 09:08 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api`
--

-- --------------------------------------------------------

--
-- Table structure for table `arbitration_cases`
--

CREATE TABLE `arbitration_cases` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('draft','submitted') NOT NULL DEFAULT 'draft',
  `current_step` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `review_status` varchar(255) NOT NULL DEFAULT 'pending',
  `review_note` text DEFAULT NULL,
  `reviewed_by` bigint(20) UNSIGNED DEFAULT NULL,
  `data_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data_json`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `arbitration_cases`
--

INSERT INTO `arbitration_cases` (`id`, `user_id`, `status`, `current_step`, `created_at`, `updated_at`, `review_status`, `review_note`, `reviewed_by`, `data_json`) VALUES
(32, 5, 'submitted', '5', '2026-03-07 18:18:48', '2026-03-07 18:21:09', 'pending', NULL, NULL, '{\"court\":{\"diary_number\":\"1234\",\"justice_name\":\"HMJ V. Kameswar Rao\",\"petition_type\":\"ARB.P.\",\"petition_number\":\"32\",\"year\":2025,\"case_title\":\"test\",\"date_of_order\":\"2025-12-29\"},\"arbitrator\":{\"appointedByCourt\":true,\"name\":\"te\",\"email\":\"te@gmail.com\",\"mobile\":\"09572092904\",\"address\":\"post- Dumrahar, ps- Darauli\"},\"claimants\":{\"claimants\":[{\"name\":\"Manish Dubey\",\"email\":\"babavikash559@gmail.com\",\"mobile\":\"9572092904\",\"address\":\"post- Dumrahar, ps- Darauli\",\"mobileError\":\"\",\"emailError\":\"\"}],\"counsels\":[{\"name\":\"er\",\"email\":\"babavikash559@gmail.com\",\"mobile\":\"08448213305\",\"address\":\"ROHTAS Bihar\"}]},\"respondents\":{\"respondents\":[{\"name\":\"vikash baba\",\"email\":\"babavikash559@gmail.com\",\"mobile\":\"08448213305\",\"address\":\"ROHTAS Bihar\"}],\"counsels\":[{\"name\":\"Manish Dubey\",\"email\":\"babavikash559@gmail.com\",\"mobile\":\"09572092904\",\"address\":\"post- Dumrahar, ps- Darauli\",\"enrollment\":\"dfgh\"}]},\"documents\":{\"reference_order\":{\"name\":\"5978310c-b8ef-4c4a-9127-cda0964b956f.png\",\"path\":\"arbitration\\/NxvGjvFYP9zBd1cPHUSlDrEjb0ovkIHX1V2e3Kiy.png\"},\"memo_parties\":{\"name\":\"a4999016-3a89-4a6b-b1c2-89e007d880ba.png\",\"path\":\"arbitration\\/clsRNPGt4wJUBSNM4f4598ifKfxHZpaNBAGkbAMf.png\"},\"other_docs\":[{\"name\":\"84c8e355-fbfc-4f0a-85a6-7f0f145a2703.png\",\"path\":\"arbitration\\/ilgEzryNZPfeMKYNislwJFPM1W71EkniepVlBmzg.png\"}],\"declaration\":true}}'),
(34, 5, 'submitted', '5', '2026-03-08 06:05:23', '2026-03-08 06:06:39', 'pending', NULL, NULL, '{\"court\":{\"diary_number\":\"12345\",\"justice_name\":\"HMJ V. Kameswar Rao\",\"petition_type\":\"OMP\",\"petition_number\":\"975\",\"year\":2025,\"case_title\":\"test\",\"date_of_order\":\"2026-03-01\"},\"arbitrator\":[],\"claimants\":{\"claimants\":[{\"name\":\"\",\"email\":\"\",\"mobile\":\"\",\"address\":\"\"}],\"counsels\":[]},\"respondents\":{\"respondents\":[{\"name\":\"vikash baba\",\"email\":\"babavikash559@gmail.com\",\"mobile\":\"08448213305\",\"address\":\"ROHTAS Bihar\"}],\"counsels\":[]},\"documents\":{\"declaration\":false}}'),
(35, 5, 'submitted', '5', '2026-03-08 06:06:47', '2026-03-11 11:36:17', 'pending', NULL, NULL, '{\"court\":{\"diary_number\":\"234\",\"justice_name\":\"HMJ V. Kameswar Rao\",\"petition_type\":\"OMP\",\"petition_number\":\"2345\",\"year\":2024,\"case_title\":\"gfn\",\"date_of_order\":\"2026-03-09\"},\"arbitrator\":{\"appointedByCourt\":true,\"name\":\"gvDF\",\"email\":\"babavikash559@gmail.com\",\"mobile\":\"08448213305\",\"address\":\"ROHTAS Bihar\"},\"claimants\":{\"claimants\":[{\"name\":\"vikash baba\",\"email\":\"babavikash559@gmail.com\",\"mobile\":\"8448213305\",\"address\":\"ROHTAS Bihar\",\"emailError\":null,\"mobileError\":null}],\"counsels\":[{\"name\":\"TEST\",\"email\":\"babavikash559@gmail.com\",\"mobile\":\"08448213305\",\"address\":\"ROHTAS Bihar\"}]},\"respondents\":{\"respondents\":[{\"name\":\"vikash baba\",\"email\":\"babavikash559@gmail.com\",\"mobile\":\"08448213305\",\"address\":\"ROHTAS Bihar\"}],\"counsels\":[{\"name\":\"vikash baba\",\"email\":\"babavikash559@gmail.com\",\"mobile\":\"08448213305\",\"address\":\"ROHTAS Bihar\",\"enrollment\":null}]}}'),
(36, 5, 'draft', '1', '2026-03-11 11:40:22', '2026-03-11 11:40:22', 'pending', NULL, NULL, '[]');

-- --------------------------------------------------------

--
-- Table structure for table `arbitration_steps`
--

CREATE TABLE `arbitration_steps` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `arbitration_case_id` bigint(20) UNSIGNED NOT NULL,
  `step_name` varchar(255) NOT NULL,
  `step_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`step_data`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'draft',
  `review_note` text DEFAULT NULL,
  `reviewed_by` bigint(20) UNSIGNED DEFAULT NULL,
  `reviewed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `arbitrators`
--

CREATE TABLE `arbitrators` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `arbitration_case_id` bigint(20) UNSIGNED NOT NULL,
  `appointed_by_court` tinyint(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `claimants`
--

CREATE TABLE `claimants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `arbitration_case_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `court_details`
--

CREATE TABLE `court_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `arbitration_case_id` bigint(20) UNSIGNED NOT NULL,
  `court_name` varchar(255) NOT NULL,
  `judge_name` varchar(255) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `filing_type` varchar(255) NOT NULL,
  `petition_number` varchar(255) NOT NULL,
  `year` varchar(255) NOT NULL,
  `case_title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `declarations`
--

CREATE TABLE `declarations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `arbitration_case_id` bigint(20) UNSIGNED NOT NULL,
  `accepted` tinyint(1) NOT NULL,
  `accepted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `arbitration_case_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2026_02_03_033516_create_arbitration_cases_table', 1),
(6, '2026_02_03_034329_create_court_details_table', 1),
(7, '2026_02_03_062100_create_arbitrators_table', 1),
(8, '2026_02_03_062216_create_claimants_table', 1),
(9, '2026_02_03_062552_create_respondents_table', 1),
(10, '2026_02_03_062646_create_documents_table', 1),
(11, '2026_02_03_062731_create_declarations_table', 1),
(12, '2026_02_04_004310_create_arbitration_steps', 1),
(13, '2026_02_11_020210_add_review_fields_to_arbitration_cases', 1),
(14, '2026_02_11_023800_add_review_fields_to_arbitration_steps', 1),
(15, '2026_02_13_153054_update_arbitration_cases_table', 2),
(16, '2026_02_24_083634_create_notifications_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `title`, `message`, `is_read`, `created_at`, `updated_at`) VALUES
(1, 5, 'Case Submitted', 'Your arbitration case submitted successfully.', 0, '2026-02-24 11:28:31', '2026-02-24 11:28:31'),
(2, 5, 'Case Submitted', 'Your arbitration case submitted successfully.', 0, '2026-03-03 18:33:57', '2026-03-03 18:33:57'),
(3, 5, 'Case Submitted', 'Your arbitration case submitted successfully.', 0, '2026-03-03 19:42:09', '2026-03-03 19:42:09'),
(4, 5, 'Case Approved', 'Administrative Officer reviewed your case.', 0, '2026-03-04 13:49:32', '2026-03-04 13:49:32'),
(5, 5, 'Case Submitted', 'Your arbitration case submitted successfully.', 0, '2026-03-04 13:57:39', '2026-03-04 13:57:39'),
(6, 5, 'Case Submitted', 'Your arbitration case submitted successfully.', 0, '2026-03-04 23:21:27', '2026-03-04 23:21:27'),
(7, 5, 'Case Submitted', 'Your arbitration case submitted successfully.', 0, '2026-03-07 18:21:09', '2026-03-07 18:21:09'),
(8, 5, 'Case Submitted', 'Your arbitration case submitted successfully.', 0, '2026-03-08 06:06:39', '2026-03-08 06:06:39');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(8, 'App\\Models\\User', 4, 'login-token', '3e696cdfbbb1d2f558e73c757a2014151879c98ae1a4ef70be9f5dd9d0d8c0ac', '[\"*\"]', '2026-03-11 05:53:04', NULL, '2026-02-13 04:19:20', '2026-03-11 05:53:04'),
(55, 'App\\Models\\User', 7, 'login-token', 'b6786a608addabaadcc2e8cab6c6cbbcb8765913e21b3e94b08b1810c13653aa', '[\"*\"]', '2026-03-11 09:35:43', NULL, '2026-03-11 07:08:22', '2026-03-11 09:35:43'),
(58, 'App\\Models\\User', 5, 'login-token', '4bbaf5df9ab2dedab510bdcca685f5b5b68294c21ee053462784a7d108fb235b', '[\"*\"]', '2026-03-11 11:40:22', NULL, '2026-03-11 11:35:01', '2026-03-11 11:40:22'),
(59, 'App\\Models\\User', 2, 'login-token', 'c922ca855573161c14d6b5bf6302f4c5e086f9e36952269704659879ae8f5a75', '[\"*\"]', '2026-03-11 11:41:15', NULL, '2026-03-11 11:41:15', '2026-03-11 11:41:15'),
(60, 'App\\Models\\User', 6, 'login-token', '4bf305482c77ec617718a675a4dda6f4a4dedc35c3cb329067a3b1f0922d8dbc', '[\"*\"]', '2026-03-11 11:45:22', NULL, '2026-03-11 11:45:22', '2026-03-11 11:45:22'),
(63, 'App\\Models\\User', 1, 'login-token', '913c45ae64d98df7afe593020b2c37d3352eca0ced327af15d7f095007322b46', '[\"*\"]', '2026-03-23 16:28:06', NULL, '2026-03-17 10:45:21', '2026-03-23 16:28:06');

-- --------------------------------------------------------

--
-- Table structure for table `respondents`
--

CREATE TABLE `respondents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `arbitration_case_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `number` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user','administrative_officer','accounts','case_filer_manager','coordinator') NOT NULL DEFAULT 'user',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `number`, `email_verified_at`, `password`, `role`, `is_active`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 'admin@system.com', NULL, NULL, '$2y$12$SrjXj5vSfamHXd9c0znEjuMrovvW4laoaxDz5gywsKfKjYF8MnLje', 'admin', 1, NULL, '2026-02-12 15:24:28', '2026-02-12 15:24:28'),
(2, 'Registrar General Administrative Officer', 'ao@harmony-nexus.com', NULL, NULL, '$2y$12$l1ejEqYKU42wVUn.dcBZWeQ7NbmSPRbIjtUMn9YHL2Toq9vsd9yuG', 'administrative_officer', 1, NULL, '2026-02-12 18:26:45', '2026-02-17 00:26:45'),
(5, 'Registry', 'test@gmail.com', NULL, NULL, '$2y$12$6eeXsl.64LIcDCU5xzJCn.lwh.RxiER7zh1hLYMax3imzLhFW2lAK', 'user', 1, NULL, '2026-02-13 04:36:34', '2026-03-10 18:45:33'),
(6, 'Accounts', 'accounts@test.com', NULL, NULL, '$2y$12$cv79NP6AOYu2DgIfKLY1DuDidnTTFtgUyhBtW8DPgonADb8EkDPkK', 'accounts', 1, NULL, '2026-03-11 05:04:39', '2026-03-11 05:04:39'),
(7, 'Case Manager', 'case@test.com', NULL, NULL, '$2y$12$OmsMEKY4zVc9U51zlXhaf.N0dLkPF3is6Uki1vFTVjzFIyLFH7awq', 'case_filer_manager', 1, NULL, '2026-03-11 05:05:12', '2026-03-11 05:05:12'),
(8, 'Coordinator', 'coordinator@test.com', NULL, NULL, '$2y$12$y67Tw8RQHr.DHAowI4ZxSODWhh4nSScrS2Qb9P1OzpzS7nzc9gfCK', 'coordinator', 1, NULL, '2026-03-11 12:00:04', '2026-03-11 12:00:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `arbitration_cases`
--
ALTER TABLE `arbitration_cases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `arbitration_cases_user_id_foreign` (`user_id`),
  ADD KEY `arbitration_cases_reviewed_by_foreign` (`reviewed_by`);

--
-- Indexes for table `arbitration_steps`
--
ALTER TABLE `arbitration_steps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `arbitration_steps_arbitration_case_id_foreign` (`arbitration_case_id`),
  ADD KEY `arbitration_steps_reviewed_by_foreign` (`reviewed_by`);

--
-- Indexes for table `arbitrators`
--
ALTER TABLE `arbitrators`
  ADD PRIMARY KEY (`id`),
  ADD KEY `arbitrators_arbitration_case_id_foreign` (`arbitration_case_id`);

--
-- Indexes for table `claimants`
--
ALTER TABLE `claimants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `claimants_arbitration_case_id_foreign` (`arbitration_case_id`);

--
-- Indexes for table `court_details`
--
ALTER TABLE `court_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `court_details_arbitration_case_id_foreign` (`arbitration_case_id`);

--
-- Indexes for table `declarations`
--
ALTER TABLE `declarations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `declarations_arbitration_case_id_foreign` (`arbitration_case_id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `documents_arbitration_case_id_foreign` (`arbitration_case_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_foreign` (`user_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `respondents`
--
ALTER TABLE `respondents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `respondents_arbitration_case_id_foreign` (`arbitration_case_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `arbitration_cases`
--
ALTER TABLE `arbitration_cases`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `arbitration_steps`
--
ALTER TABLE `arbitration_steps`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `arbitrators`
--
ALTER TABLE `arbitrators`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `claimants`
--
ALTER TABLE `claimants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `court_details`
--
ALTER TABLE `court_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `declarations`
--
ALTER TABLE `declarations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `respondents`
--
ALTER TABLE `respondents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `arbitration_cases`
--
ALTER TABLE `arbitration_cases`
  ADD CONSTRAINT `arbitration_cases_reviewed_by_foreign` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `arbitration_cases_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `arbitration_steps`
--
ALTER TABLE `arbitration_steps`
  ADD CONSTRAINT `arbitration_steps_arbitration_case_id_foreign` FOREIGN KEY (`arbitration_case_id`) REFERENCES `arbitration_cases` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `arbitration_steps_reviewed_by_foreign` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `arbitrators`
--
ALTER TABLE `arbitrators`
  ADD CONSTRAINT `arbitrators_arbitration_case_id_foreign` FOREIGN KEY (`arbitration_case_id`) REFERENCES `arbitration_cases` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `claimants`
--
ALTER TABLE `claimants`
  ADD CONSTRAINT `claimants_arbitration_case_id_foreign` FOREIGN KEY (`arbitration_case_id`) REFERENCES `arbitration_cases` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `court_details`
--
ALTER TABLE `court_details`
  ADD CONSTRAINT `court_details_arbitration_case_id_foreign` FOREIGN KEY (`arbitration_case_id`) REFERENCES `arbitration_cases` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `declarations`
--
ALTER TABLE `declarations`
  ADD CONSTRAINT `declarations_arbitration_case_id_foreign` FOREIGN KEY (`arbitration_case_id`) REFERENCES `arbitration_cases` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_arbitration_case_id_foreign` FOREIGN KEY (`arbitration_case_id`) REFERENCES `arbitration_cases` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `respondents`
--
ALTER TABLE `respondents`
  ADD CONSTRAINT `respondents_arbitration_case_id_foreign` FOREIGN KEY (`arbitration_case_id`) REFERENCES `arbitration_cases` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
