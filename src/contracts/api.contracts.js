/**
 * API Contracts — Single Source of Truth
 * ============================================
 * Semua endpoint di Dashboard HARUS mengikuti format response ini.
 * Format response standar: { success: boolean, data: object | array }
 *
 * Kontrak ini digunakan sebagai referensi saat:
 * 1. Membangun Dashboard backend (REST API)
 * 2. Migrasi datasource dari JSON ke API
 * 3. Testing dan validasi response
 */

/**
 * GET /profile
 *
 * Response:
 * {
 *   "success": true,
 *   "data": {
 *     "name": "string",
 *     "degree": "string",
 *     "greeting": "string",
 *     "title": "string",
 *     "description": "string",
 *     "specialties": ["string"],
 *     "bio": "string",
 *     "bioHighlights": ["string"],
 *     "resumeUrl": "string",
 *     "resumeFilename": "string",
 *     "stats": {
 *       "enterpriseProjects": "number",
 *       "sonarQubePass": "boolean"
 *     },
 *     "techBadges": ["string"]
 *   }
 * }
 */
export const PROFILE_CONTRACT = {
  method: 'GET',
  endpoint: '/profile',
  response: {
    success: true,
    data: {
      name: 'string',
      degree: 'string',
      greeting: 'string',
      title: 'string',
      description: 'string',
      specialties: ['string'],
      bio: 'string',
      bioHighlights: ['string'],
      resumeUrl: 'string',
      resumeFilename: 'string',
      stats: {
        enterpriseProjects: 'number',
        sonarQubePass: 'boolean',
      },
      techBadges: ['string'],
    },
  },
};

/**
 * GET /projects
 *
 * Response:
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "title": "string",
 *       "description": "string",
 *       "techInformation": ["string"],
 *       "button": {
 *         "active": "boolean",
 *         "link": "string | null",
 *         "title": "string | null"
 *       },
 *       "images": {
 *         "folder": "string",
 *         "thumbnail": "string",
 *         "total": "number"
 *       }
 *     }
 *   ]
 * }
 */
export const PROJECTS_CONTRACT = {
  method: 'GET',
  endpoint: '/projects',
  response: {
    success: true,
    data: [
      {
        title: 'string',
        description: 'string',
        techInformation: ['string'],
        button: {
          active: 'boolean',
          link: 'string | null',
          title: 'string | null',
        },
        images: {
          folder: 'string',
          thumbnail: 'string',
          total: 'number',
        },
      },
    ],
  },
};

/**
 * GET /experiences
 *
 * Response:
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "title": "string",
 *       "type": "period | onetime",
 *       "startDate": "string (YYYY-MM) | null",
 *       "endDate": "string (YYYY-MM) | null",
 *       "date": "string (YYYY-MM-DD) | null",
 *       "description": "string",
 *       "organizer": "string",
 *       "location": "string",
 *       "directory": "string",
 *       "Img": ["string"],
 *       "caption": ["string"] | "string"
 *     }
 *   ]
 * }
 */
export const EXPERIENCES_CONTRACT = {
  method: 'GET',
  endpoint: '/experiences',
  response: {
    success: true,
    data: [
      {
        title: 'string',
        type: 'period | onetime',
        startDate: 'string | null',
        endDate: 'string | null',
        date: 'string | null',
        description: 'string',
        organizer: 'string',
        location: 'string',
        directory: 'string',
        Img: ['string'],
        caption: ['string'],
      },
    ],
  },
};

/**
 * GET /skills
 *
 * Response:
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "name": "string",
 *       "type": "string",
 *       "level": "Basic | Intermediate | Advanced",
 *       "group": "string",
 *       "img": "string"
 *     }
 *   ]
 * }
 */
export const SKILLS_CONTRACT = {
  method: 'GET',
  endpoint: '/skills',
  response: {
    success: true,
    data: [
      {
        name: 'string',
        type: 'string',
        level: 'Basic | Intermediate | Advanced',
        group: 'string',
        img: 'string',
      },
    ],
  },
};

/**
 * GET /certificates
 *
 * Response:
 * {
 *   "success": true,
 *   "data": []
 * }
 *
 * Note: Kontrak disiapkan kosong. Struktur detail akan ditentukan
 * saat data sertifikat tersedia di Dashboard.
 */
export const CERTIFICATES_CONTRACT = {
  method: 'GET',
  endpoint: '/certificates',
  response: {
    success: true,
    data: [],
  },
};
